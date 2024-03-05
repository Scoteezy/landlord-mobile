import { supabase } from "@/lib/supabase";
import { FetchedUser, UserUpdate } from "@/types/User";
import { Session } from "@supabase/supabase-js";
export const fetchUserInfo = async (session: Session): Promise<FetchedUser> => {
  const { data, error, status } = await supabase
    .from("profiles")
    .select(
      `id,username,mobile_number,avatar_url,gender,address,age,full_name,rent_from`
    )
    .eq("id", session?.user.id)
    .single();
  return { data, error, status };
};

export const updateUserInfo = async (
  updates: UserUpdate,
  id: string
): Promise<FetchedUser> => {
  const { error } = await supabase.from("profiles").upsert(updates);
  const { data, status } = await supabase
    .from("profiles")
    .select(
      `id,username,mobile_number,avatar_url,gender,address,age,full_name,rent_from`
    )
    .eq("id", id)
    .single();
  return { error, data, status };
};
