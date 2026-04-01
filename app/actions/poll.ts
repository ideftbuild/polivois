"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreatePollData, UpdatePollData } from "@/types";

export async function createPoll(data: CreatePollData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("You must be logged in to create a poll");
    }

    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .insert({
        title: data.title,
        description: data.description || null,
        creator_id: user.id,
        expires_at: data.expiresAt
          ? new Date(data.expiresAt).toISOString()
          : null,
      })
      .select()
      .single();

    if (pollError) throw pollError;

    const optionsToInsert = data.options.map((text) => ({
      poll_id: poll.id,
      text: text,
      votes: 0,
    }));

    const { error: optionsError } = await supabase
      .from("poll_options")
      .insert(optionsToInsert);

    if (optionsError) {
      await supabase.from("polls").delete().eq("id", poll.id);
      console.error(
        "Failed to create options for poll, rolled back:",
        optionsError,
      );
      throw new Error("Failed to create poll options");
    }

    revalidatePath("/polls");

    return { success: true, pollId: poll.id };
  } catch (error: any) {
    console.error("Error creating poll:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
}

export async function getPolls() {
  try {
    const supabase = await createClient();

    const { data: polls, error } = await supabase
      .from("polls")
      .select(
        `
        *,
        options:poll_options(*)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formattedPolls = polls.map((poll) => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      creatorId: poll.creator_id,
      expiresAt: poll.expires_at ? new Date(poll.expires_at) : undefined,
      createdAt: new Date(poll.created_at),
      updatedAt: new Date(poll.updated_at),
      options: poll.options.map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes,
        pollId: opt.poll_id,
      })),
    }));

    return { success: true, polls: formattedPolls };
  } catch (error: any) {
    console.error("Error fetching polls:", error);
    return { success: false, error: error.message || "Failed to fetch polls" };
  }
}

export async function getPoll(id: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: poll, error } = await supabase
      .from("polls")
      .select(
        `
        *,
        options:poll_options(*)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    let userVotes: string[] = [];
    if (user) {
      const { data: votes } = await supabase
        .from("votes")
        .select("option_id")
        .eq("poll_id", id)
        .eq("user_id", user.id);

      if (votes) {
        userVotes = votes.map((v: any) => v.option_id);
      }
    }

    const formattedPoll = {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      creatorId: poll.creator_id,
      expiresAt: poll.expires_at ? new Date(poll.expires_at) : undefined,
      createdAt: new Date(poll.created_at),
      updatedAt: new Date(poll.updated_at),
      options: poll.options.map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes,
        pollId: opt.poll_id,
      })),
    };

    return { success: true, poll: formattedPoll, userVotes };
  } catch (error: any) {
    console.error("Error fetching poll:", error);
    return { success: false, error: error.message || "Failed to fetch poll" };
  }
}

export async function getUserPolls() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("You must be logged in to fetch your polls");
    }

    const { data: polls, error } = await supabase
      .from("polls")
      .select(
        `
        *,
        options:poll_options(*)
      `,
      )
      .eq("creator_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formattedPolls = polls.map((poll) => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      creatorId: poll.creator_id,
      expiresAt: poll.expires_at ? new Date(poll.expires_at) : undefined,
      createdAt: new Date(poll.created_at),
      updatedAt: new Date(poll.updated_at),
      options: poll.options.map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        votes: opt.votes,
        pollId: opt.poll_id,
      })),
    }));

    return { success: true, polls: formattedPolls };
  } catch (error: any) {
    console.error("Error fetching user polls:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch user polls",
    };
  }
}

export async function votePoll(pollId: string, optionId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("You must be logged in to vote");
    }

    const { error } = await supabase.from("votes").insert({
      poll_id: pollId,
      option_id: optionId,
      user_id: user.id,
    });

    if (error) throw error;

    revalidatePath(`/polls/${pollId}`);
    revalidatePath(`/polls`);

    return { success: true };
  } catch (error: any) {
    console.error("Error voting:", error);
    return { success: false, error: error.message || "Failed to submit vote" };
  }
}

export async function updatePoll(pollId: string, data: UpdatePollData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("You must be logged in to update a poll");
    }

    const updates: any = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== undefined) updates.description = data.description;
    if (data.expiresAt !== undefined) {
      updates.expires_at = data.expiresAt
        ? new Date(data.expiresAt).toISOString()
        : null;
    }

    const { error: updateError } = await supabase
      .from("polls")
      .update(updates)
      .eq("id", pollId)
      .eq("creator_id", user.id);

    if (updateError) throw updateError;

    revalidatePath(`/polls/${pollId}`);
    revalidatePath(`/polls`);

    return { success: true };
  } catch (error: any) {
    console.error("Error updating poll:", error);
    return { success: false, error: error.message || "Failed to update poll" };
  }
}
