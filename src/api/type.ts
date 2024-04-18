import { supabase } from "./supabase";

export const SUPABASE_TYPE_TABLE = "versus_type";

export const selectTypes = () => supabase.from(SUPABASE_TYPE_TABLE).select();
export const selectTypeById = (id: number) =>
  supabase.from(SUPABASE_TYPE_TABLE).select().eq("id", id).maybeSingle();
