import { createClient } from "@/supabase/client";

export const authenticate = async (email: string, password: string) => {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  } catch (error) {
    console.log("AUTHENTICATION ERROR", error);
    throw error;
  }
};
