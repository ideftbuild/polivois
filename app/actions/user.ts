"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@/types";

export const getUser = async (
  id: string | null | undefined,
): Promise<{ success: boolean; user?: User; error?: string }> => {
  if (!id) return { success: false, error: "User ID is required" };

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user };
};
