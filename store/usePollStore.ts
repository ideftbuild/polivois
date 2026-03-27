import { create } from 'zustand';
import { Poll, PollOption } from '@/types';

interface PollStore {
  polls: Poll[];
  isLoading: boolean;

  // Actions
  setPolls: (polls: Poll[]) => void;
  addPoll: (poll: Poll) => void;
  updatePoll: (id: string, updates: Partial<Poll>) => void;
  deletePoll: (id: string) => void;
  updateOption: (pollId: string, option: PollOption) => void;
  setLoading: (loading: boolean) => void;

  // Selectors
  getPoll: (id: string) => Poll | undefined;
  getUserPolls: (userId: string) => Poll[];
}

export const usePollStore = create<PollStore>((set, get) => ({
  polls: [],
  isLoading: true,

  setPolls: (polls) => set({ polls, isLoading: false }),

  addPoll: (poll) => set((state) => {
    // Prevent duplicates if already exists
    if (state.polls.some((p) => p.id === poll.id)) {
      return state;
    }
    // Add new poll to the beginning
    return { polls: [poll, ...state.polls] };
  }),

  updatePoll: (id, updates) => set((state) => ({
    polls: state.polls.map((poll) =>
      poll.id === id ? { ...poll, ...updates } : poll
    ),
  })),

  deletePoll: (id) => set((state) => ({
    polls: state.polls.filter((poll) => poll.id !== id),
  })),

  updateOption: (pollId, updatedOption) => set((state) => ({
    polls: state.polls.map((poll) => {
      if (poll.id !== pollId) return poll;

      const optionExists = poll.options.some((opt) => opt.id === updatedOption.id);

      return {
        ...poll,
        options: optionExists
          ? poll.options.map((opt) => (opt.id === updatedOption.id ? updatedOption : opt))
          : [...poll.options, updatedOption],
      };
    }),
  })),

  setLoading: (isLoading) => set({ isLoading }),

  // Selector methods
  getPoll: (id) => get().polls.find((p) => p.id === id),

  getUserPolls: (userId) => get().polls.filter((p) => p.creatorId === userId),
}));
