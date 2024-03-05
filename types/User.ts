import { PostgrestError } from "@supabase/supabase-js";

export type User = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  mobile_number: number;
  gender: string;
  address: string;
  rent_from: string;
  age: number;
};
export type FetchedUser = {
  data: User | null;
  status: number;
  error: PostgrestError | null;
};
export type UserUpdate = {
  id: string;
  updated_at: Date;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  mobile_number?: number;
  gender?: string;
  address?: string;
  rent_from?: Date;
  age?: number;
};
