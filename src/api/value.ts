import { ValueUpdate } from "src/models/Value";
import { supabase } from "./supabase";

export const SUPABASE_VALUE_TABLE = "versus_value";
export const SUPABASE_RANDOMVALUE_TABLE = "versus_randomvalue";

export const selectValueByType = (
  type: number,
  limit: number,
  notin?: Array<number>
) =>
  notin
    ? supabase
        .from(SUPABASE_RANDOMVALUE_TABLE)
        .select()
        .eq("type", type)
        .limit(limit)
    : supabase
        .from(SUPABASE_RANDOMVALUE_TABLE)
        .select()
        .eq("type", type)
        .limit(limit);

export const updateValueById = (value: ValueUpdate) =>
  supabase.rpc("updateversus", {
    valueid: value.id,
    newwin: value.win,
    newlose: value.lose,
    newdontknow: value.dontknow,
  });

export const selectValueByTypeOrder = (
  type: number,
  page: number,
  limit: number,
  order: string
) =>
  supabase
    .from(SUPABASE_RANDOMVALUE_TABLE)
    .select()
    .eq("type", type)
    .order(order, { ascending: false })
    .range(page * limit, (page + 1) * limit);
