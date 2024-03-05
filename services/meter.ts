import { supabase } from "@/lib/supabase";
import { FetchedMeters } from "@/types/Meter";
import { Session } from "@supabase/supabase-js";

export const fetchMetersInfo = async (
  session: Session
): Promise<FetchedMeters> => {
  // const { data, error, status } = await supabase
  //   .from("house")
  //   .select(
  //     `landlord_id,builded_at,address,available_from,rent_from,monthly_payment, profiles(rent_from), landlord(full_name,phone,mail)`
  //   )
  //   .eq("renter_id", session.user?.id)
  let { data, error, status } = await supabase
    .from("meters")
    .select("rent,water,electricity,ethernet,date")
    .eq("renter_id", session.user?.id);
  return { data, error, status };
};
