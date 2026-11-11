import { validProfile } from "./matching.mjs";
import type { Profile } from "./types";
export const PROFILE_KEY = "lantern-profile-v1";
const SAVED_KEY = "lantern-saved-v1";
export function readProfile(): Profile | null {
  try {
    const p: unknown = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    return validProfile(p) ? p : null;
  } catch {
    return null;
  }
}
export function readSaved(): string[] {
  try {
    const p: unknown = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    return Array.isArray(p)
      ? [...new Set(p.filter((v): v is string => typeof v === "string"))]
      : [];
  } catch {
    return [];
  }
}
export function saveProfile(p: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}
export function writeSaved(codes: string[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(codes));
}

