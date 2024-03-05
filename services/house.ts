import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export const fetchHouseInfo = async (session: Session) => {
  const { data, error, status } = await supabase
    .from("house")
    .select(
      `landlord_id,builded_at,address,available_from,rent_from,monthly_payment, profiles(rent_from), landlord(full_name,phone,mail)`
    )
    .eq("renter_id", session.user?.id)
    .single();
  return { data, error, status };
};
