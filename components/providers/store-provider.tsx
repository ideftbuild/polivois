"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePollStore } from "@/store/usePollStore";
import { useUserStore } from "@/store/useUserStore";
import { getPolls } from "@/app/actions/poll";
import { Poll } from "@/types";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const {
    setPolls,
    addPoll,
    updatePoll,
    deletePoll,
    updateOption,
    setLoading: setPollsLoading,
  } = usePollStore();

  const { setUser, setLoading: setUserLoading } = useUserStore();

  useEffect(() => {
    let mounted = true;

    // Initialize Auth State
    const initAuth = async () => {
      setUserLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUser(
          session?.user
            ? {
                id: session.user.id,
                name: session.user.user_metadata?.name || "User",
                email: session.user.email || "",
                avatar: session.user.user_metadata?.avatar_url || null,
                createdAt: new Date(session.user.created_at),
                updatedAt: new Date(
                  session.user.updated_at || session.user.created_at,
                ),
              }
            : null,
        );
      }
    };

    initAuth();

    // Listen to Auth Changes
    const {
      data: { subscription: authSub },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? {
              id: session.user.id,
              name: session.user.user_metadata?.name || "User",
              email: session.user.email || "",
              avatar: session.user.user_metadata?.avatar_url || null,
              createdAt: new Date(session.user.created_at),
              updatedAt: new Date(
                session.user.updated_at || session.user.created_at,
              ),
            }
          : null,
      );
    });

    // Initialize Polls
    const initPolls = async () => {
      setPollsLoading(true);
      try {
        const result = await getPolls();
        if (mounted && result.success && result.polls) {
          setPolls(result.polls as unknown as Poll[]);
        }
      } catch (err) {
        console.error("Failed to load initial polls:", err);
      } finally {
        if (mounted) setPollsLoading(false);
      }
    };

    initPolls();

    // Set up Realtime subscriptions for Sync
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "polls" },
        (payload) => {
          const newPoll = payload.new;
          addPoll({
            id: newPoll.id,
            title: newPoll.title,
            description: newPoll.description,
            creatorId: newPoll.creator_id,
            expiresAt: newPoll.expires_at
              ? new Date(newPoll.expires_at)
              : undefined,
            createdAt: new Date(newPoll.created_at),
            updatedAt: new Date(newPoll.updated_at),
            options: [], // Options will be added automatically via their own INSERTS
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "polls" },
        (payload) => {
          const updated = payload.new;
          updatePoll(updated.id, {
            title: updated.title,
            description: updated.description,
            expiresAt: updated.expires_at
              ? new Date(updated.expires_at)
              : undefined,
            updatedAt: new Date(updated.updated_at),
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "polls" },
        (payload) => {
          if (payload.old.id) {
            deletePoll(payload.old.id);
          }
        },
      )
      // Listen to options updates (like vote counts changing or new options on creation)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "poll_options" },
        (payload) => {
          const updatedOption = payload.new;
          updateOption(updatedOption.poll_id, {
            id: updatedOption.id,
            text: updatedOption.text,
            votes: updatedOption.votes,
            pollId: updatedOption.poll_id,
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "poll_options" },
        (payload) => {
          const newOption = payload.new;
          updateOption(newOption.poll_id, {
            id: newOption.id,
            text: newOption.text,
            votes: newOption.votes,
            pollId: newOption.poll_id,
          });
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      authSub.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [
    supabase,
    setPolls,
    addPoll,
    updatePoll,
    deletePoll,
    updateOption,
    setPollsLoading,
    setUser,
    setUserLoading,
  ]);

  return <>{children}</>;
}
