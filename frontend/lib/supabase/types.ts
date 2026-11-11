export type Skill = {
    name: string;
    type: string;
    importance: number;
    level: number;
  };
  export type Occupation = {
    onet_code: string;
    title: string;
    description: string;
    job_zone: number;
    median_wage: number | null;
    skills: Skill[];
    interest_source: string;
    [key: string]: unknown;
  };
  export type Profile = { version: 1; answers: number[]; maxZone: number };
  export type Match = {
    occupation: Occupation;
    distance: number;
    reasons: string[];
    tradeoffs: string[];
  };
  