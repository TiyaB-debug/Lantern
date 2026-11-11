import type { Occupation, Profile, Match } from "./types";
export const dimensions: readonly string[];
export const questions: [string, string][];
export function validProfile(p: unknown): p is Profile;
export function interestProfile(answers: number[]): Record<string, number>;
export function rankOccupations(
  occupations: Occupation[],
  profile: Profile,
): Match[];
