"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { interestProfile, rankOccupations } from "@/lib/supabase/matching.mjsching.mjs";
import { PROFILE_KEY, readProfile, readSaved, writeSaved } from "@/lib/supabase/storagee/storage";
import type { Occupation, Profile } from "@/lib/types";
export default function CareerExplorer({
  savedOnly = false,
  browse = false,
}: {
  savedOnly?: boolean;
  browse?: boolean;
}) {
  const [data, setData] = useState<Occupation[] | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [compare, setCompare] = useState<string[]>([]);
  useEffect(() => {
    setProfile(readProfile());
    setSaved(readSaved());
    const controller = new AbortController();
    fetch("/api/occupations", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setData(d.occupations))
      .catch((e) => {
        if (e.name !== "AbortError")
          setError("Career data could not load. Please reload to try again.");
      });
    return () => controller.abort();
  }, []);
  function toggle(code: string) {
    const next = saved.includes(code)
      ? saved.filter((c) => c !== code)
      : [...saved, code];
    try {
      writeSaved(next);
      setSaved(next);
      setNotice(next.includes(code) ? "Career saved." : "Career removed.");
    } catch {
      setNotice("Saving is unavailable in this browser.");
    }
  }
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p role="status">Loading career information…</p>;
  if (!savedOnly && !browse && !profile)
    return (
      <div>
        <p>
          Complete the interest questions to see explained career suggestions.
        </p>
        <Link className="btn btn-primary" href="/assessment">
          Start exploring
        </Link>
      </div>
    );
  const ranked = profile ? rankOccupations(data, profile) : [];
  const entries = savedOnly
    ? data
        .filter((o) => saved.includes(o.onet_code))
        .map((occupation) => ({
          occupation,
          reasons: [] as string[],
          tradeoffs: [] as string[],
        }))
    : browse
      ? [...data]
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((occupation) => ({
            occupation,
            reasons: [] as string[],
            tradeoffs: [] as string[],
          }))
      : ranked;
  const filtered = entries.filter(({ occupation: o }) =>
    o.title.toLowerCase().includes(query.toLowerCase()),
  );
  const chosen = data.filter((o) => compare.includes(o.onet_code));
  return (
    <>
      {!savedOnly && !browse && profile && (
        <>
          <p>
            These suggestions compare your stated interests with occupation
            interest profiles. Preparation is filtered separately. Skills, work
            values, lifestyle, and future outlook are not scored yet.
          </p>
          {new Set(profile.answers).size === 1 && (
            <p role="note">
              <strong>Limited differentiation:</strong> all your answers are the
              same, so this profile gives us little evidence about which
              activities you prefer over others. Try editing your answers before
              relying on the order.
            </p>
          )}
          <div className="interest-summary">
            {Object.entries(interestProfile(profile.answers)).map(
              ([key, value]) => (
                <div key={key}>
                  <span className="capitalize">{key}</span>
                  <meter
                    aria-label={`${key} stated interest`}
                    min={0}
                    max={1}
                    value={value}
                  />
                </div>
              ),
            )}
          </div>
          <div className="actions">
            <Link className="btn btn-secondary" href="/assessment">
              Edit my profile
            </Link>
            <button
              className="text-button"
              onClick={() => {
                try {
                  localStorage.removeItem(PROFILE_KEY);
                  setProfile(null);
                } catch {
                  setNotice("Your profile could not be cleared.");
                }
              }}
            >
              Clear my profile
            </button>
          </div>
          <p className="fine-print">
            Method: smallest average absolute difference across six interest
            dimensions, after averaging two answers per dimension. This is an
            exploratory ordering, not a probability of success or validated fit
            score.
          </p>
        </>
      )}
      <label htmlFor="career-search">
        Search{" "}
        {savedOnly ? "saved careers" : browse ? "careers" : "suggestions"}
      </label>
      <input
        id="career-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by career title"
      />
      <p role="status">{notice || `${filtered.length} careers available`}</p>
      {chosen.length > 0 && (
        <section className="comparison">
          <h2>Compare careers</h2>
          <p>
            Select up to three careers. Remove a selection using its Compare
            checkbox.
          </p>
          <div className="table-scroll">
            <table>
              <caption className="sr-only">Selected career comparison</caption>
              <thead>
                <tr>
                  <th>Career</th>
                  <th>Preparation</th>
                  <th>Leading skills</th>
                  <th>Wage</th>
                </tr>
              </thead>
              <tbody>
                {chosen.map((o) => (
                  <tr key={o.onet_code}>
                    <th>
                      <Link href={`/careers/${o.onet_code}`}>{o.title}</Link>
                    </th>
                    <td>Zone {o.job_zone}</td>
                    <td>
                      {o.skills
                        .slice(0, 3)
                        .map((s) => s.name)
                        .join(", ")}
                    </td>
                    <td>{wage(o.median_wage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {!filtered.length && (
        <p>
          {savedOnly
            ? "No saved careers match. Save careers from your results to revisit them here."
            : "No careers match these filters. Try another search or edit your preparation preference."}
        </p>
      )}
      <div className="career-grid">
        {filtered
          .slice(0, 60)
          .map(({ occupation: o, reasons, tradeoffs }, i) => (
            <article className="career-card" key={o.onet_code}>
              <p className="eyebrow">
                {savedOnly
                  ? "Saved career"
                  : browse
                    ? "Career direction"
                    : `Suggestion ${i + 1}`}
              </p>
              <h2>
                <Link href={`/careers/${o.onet_code}`}>{o.title}</Link>
              </h2>
              <p>{o.description}</p>
              {!savedOnly && !browse && (
                <p>
                  <strong>Why explore it:</strong>{" "}
                  {reasons.length
                    ? `You and this occupation share stronger interest signals in ${reasons.join(" and ")} activities.`
                    : "Its overall interest pattern is relatively close to your answers; no individual shared high-interest signal was found."}
                </p>
              )}
              {!savedOnly && !browse && tradeoffs.length > 0 && (
                <p>
                  <strong>Look closer:</strong> your interest signals differ in{" "}
                  {tradeoffs.join(", ")} activities.
                </p>
              )}
              <p>
                Preparation: zone {o.job_zone} · {wage(o.median_wage)}
              </p>
              <div className="actions">
                <Link href={`/careers/${o.onet_code}`} className="text-button">
                  View career
                </Link>
                <button
                  className="text-button"
                  aria-pressed={saved.includes(o.onet_code)}
                  onClick={() => toggle(o.onet_code)}
                >
                  {saved.includes(o.onet_code) ? "Unsave" : "Save"}
                </button>
                <label>
                  <input
                    type="checkbox"
                    checked={compare.includes(o.onet_code)}
                    disabled={
                      compare.length >= 3 && !compare.includes(o.onet_code)
                    }
                    onChange={() =>
                      setCompare((c) =>
                        c.includes(o.onet_code)
                          ? c.filter((k) => k !== o.onet_code)
                          : [...c, o.onet_code],
                      )
                    }
                  />{" "}
                  Compare
                </label>
              </div>
            </article>
          ))}
      </div>
      {filtered.length > 60 && (
        <p>Showing the first 60 careers. Search by title to narrow the list.</p>
      )}
      <p className="fine-print">
        Occupation data: O*NET Database 31.0. Contains O*NET information, used
        under CC BY 4.0. Lantern has transformed source scores.{" "}
        <a href="https://www.onetcenter.org/database.html">
          Source and license details
        </a>
        . Wages are unavailable in the current dataset.
      </p>
    </>
  );
}
function wage(value: number | null) {
  return typeof value === "number" && Number.isFinite(value)
    ? `$${value.toLocaleString()} median annual wage`
    : "Wage unavailable";
}
