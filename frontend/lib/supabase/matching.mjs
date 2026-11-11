export const dimensions = [
    "realistic",
    "investigative",
    "artistic",
    "social",
    "enterprising",
    "conventional",
  ];
  export const questions = [
    ["realistic", "Build or repair something with your hands."],
    ["realistic", "Work with tools, equipment, or physical materials."],
    ["investigative", "Investigate why something happened using evidence."],
    ["investigative", "Explore a difficult scientific or analytical question."],
    ["artistic", "Create an original design, story, or visual."],
    ["artistic", "Find a new way to express an idea."],
    ["social", "Teach someone a skill and help them improve."],
    ["social", "Support someone through a challenge."],
    ["enterprising", "Persuade people to support an idea."],
    ["enterprising", "Lead a project and make decisions with a team."],
    ["conventional", "Organize information into a clear, reliable system."],
    ["conventional", "Check records and details for accuracy."],
  ];
  export function validProfile(p) {
    return (
      !!p &&
      p.version === 1 &&
      Array.isArray(p.answers) &&
      p.answers.length === questions.length &&
      p.answers.every((v) => Number.isInteger(v) && v >= 0 && v <= 4) &&
      Number.isInteger(p.maxZone) &&
      p.maxZone >= 1 &&
      p.maxZone <= 5
    );
  }
  export function interestProfile(answers) {
    if (
      !Array.isArray(answers) ||
      answers.length !== questions.length ||
      answers.some((v) => !Number.isInteger(v) || v < 0 || v > 4)
    )
      throw new Error("Complete all interest questions first.");
    return Object.fromEntries(
      dimensions.map((key) => {
        const values = questions.flatMap(([d], i) =>
          d === key ? [answers[i] / 4] : [],
        );
        return [key, values.reduce((sum, v) => sum + v, 0) / values.length];
      }),
    );
  }
  export function rankOccupations(occupations, profile) {
    if (!validProfile(profile)) throw new Error("Invalid profile");
    const interests = interestProfile(profile.answers);
    return occupations
      .filter(
        (o) =>
          o.job_zone <= profile.maxZone &&
          dimensions.every(
            (k) => Number.isFinite(o[k]) && o[k] >= 0 && o[k] <= 1,
          ),
      )
      .map((occupation) => {
        const distance =
          dimensions.reduce(
            (sum, key) => sum + Math.abs(interests[key] - occupation[key]),
            0,
          ) / dimensions.length;
        const reasons = dimensions
          .filter((key) => interests[key] >= 0.5 && occupation[key] >= 0.5)
          .sort(
            (a, b) =>
              Math.min(interests[b], occupation[b]) -
              Math.min(interests[a], occupation[a]),
          )
          .slice(0, 2);
        const tradeoffs = dimensions.filter(
          (key) => Math.abs(interests[key] - occupation[key]) >= 0.4,
        );
        return { occupation, distance, reasons, tradeoffs };
      })
      .sort(
        (a, b) =>
          a.distance - b.distance ||
          a.occupation.onet_code.localeCompare(b.occupation.onet_code),
      );
  }
  