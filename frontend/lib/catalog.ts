import raw from "../../occupations.json";
import type { Occupation } from "./supabase/types";
export const occupations = raw.occupations as Occupation[];
export const catalogMeta = raw.meta;
