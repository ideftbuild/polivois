-- Supabase Database Schema for Polling App with QR Code Sharing
-- Main application tables only (auth.users is handled by Supabase Authentication)

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (extends Supabase auth.users)
-- This stores additional profile data not in auth.users
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Polls table
CREATE TABLE polls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Poll options table
CREATE TABLE poll_options (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    text TEXT NOT NULL,
    votes INTEGER DEFAULT 0 NOT NULL,
    poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL
);

-- Votes table
CREATE TABLE votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL,
    option_id UUID REFERENCES poll_options(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

    -- Ensure a user can only vote once per poll
    UNIQUE(user_id, poll_id)
);

-- Create indexes for better performance
CREATE INDEX idx_polls_creator_id ON polls(creator_id);
CREATE INDEX idx_polls_expires_at ON polls(expires_at);
CREATE INDEX idx_poll_options_poll_id ON poll_options(poll_id);
CREATE INDEX idx_votes_user_id ON votes(user_id);
CREATE INDEX idx_votes_poll_id ON votes(poll_id);
CREATE INDEX idx_votes_option_id ON votes(option_id);

-- Function to update vote counts
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment vote count for the option
        UPDATE poll_options
        SET votes = votes + 1
        WHERE id = NEW.option_id;

        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement vote count for the option
        UPDATE poll_options
        SET votes = votes - 1
        WHERE id = OLD.option_id;

        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_vote_counts
    AFTER INSERT OR DELETE ON votes
    FOR EACH ROW
    EXECUTE FUNCTION update_vote_counts();

CREATE TRIGGER trigger_update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_polls_updated_at
    BEFORE UPDATE ON polls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view all profiles" ON user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Polls policies
CREATE POLICY "Anyone can view active polls" ON polls
    FOR SELECT USING (expires_at IS NULL OR expires_at > NOW());

CREATE POLICY "Users can view their own polls" ON polls
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Authenticated users can create polls" ON polls
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own polls" ON polls
    FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own polls" ON polls
    FOR DELETE USING (auth.uid() = creator_id);

-- Poll options policies
CREATE POLICY "Anyone can view poll options for active polls" ON poll_options
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM polls
            WHERE id = poll_id AND (expires_at IS NULL OR expires_at > NOW())
        )
    );

CREATE POLICY "Users can view poll options for their own polls" ON poll_options
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM polls
            WHERE id = poll_id AND creator_id = auth.uid()
        )
    );

CREATE POLICY "Users can create options for their own polls" ON poll_options
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM polls
            WHERE id = poll_id AND creator_id = auth.uid()
        )
    );

CREATE POLICY "Users can update options for their own polls" ON poll_options
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM polls
            WHERE id = poll_id AND creator_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete options for their own polls" ON poll_options
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM polls
            WHERE id = poll_id AND creator_id = auth.uid()
        )
    );

-- Votes policies
CREATE POLICY "Users can view their own votes" ON votes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can vote on active polls" ON votes
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM polls
            WHERE id = poll_id AND (expires_at IS NULL OR expires_at > NOW())
        )
    );

CREATE POLICY "Users can delete their own votes" ON votes
    FOR DELETE USING (auth.uid() = user_id);

-- Function to handle user profile creation (for Supabase auth integration)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, name, avatar)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', 'Anonymous'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile when auth user is created
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to check if user can vote
CREATE OR REPLACE FUNCTION can_user_vote(poll_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    poll_expires_at TIMESTAMP WITH TIME ZONE;
    existing_votes INTEGER;
BEGIN
    -- Get poll expiration date
    SELECT expires_at INTO poll_expires_at
    FROM polls
    WHERE id = poll_uuid;

    -- Check if poll exists and is active
    IF NOT FOUND OR (poll_expires_at IS NOT NULL AND poll_expires_at <= NOW()) THEN
        RETURN FALSE;
    END IF;

    -- Check if user has already voted on this poll
    SELECT COUNT(*) INTO existing_votes
    FROM votes
    WHERE poll_id = poll_uuid AND user_id = user_uuid;

    RETURN existing_votes = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Supabase Realtime for the tables
-- This is required for clients to receive broadcast events (INSERT, UPDATE, DELETE)
ALTER PUBLICATION supabase_realtime ADD TABLE polls;
ALTER PUBLICATION supabase_realtime ADD TABLE poll_options;
