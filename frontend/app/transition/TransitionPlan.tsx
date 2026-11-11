"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./transition.module.css";

const tasks = [
  ["Validate the role and working conditions", "Speak with someone who does this work. Ask about their schedule, typical tasks, and what surprised them."],
  ["Identify entry requirements and skills", "Read three job descriptions and write down the requirements that appear more than once."],
  ["Choose a feasible learning or entry route", "Compare the time, cost, and support available for two ways into the role."],
  ["Build relevant practice and evidence", "Try a small project that reflects the work and document what you learned."],
  ["Prepare applications and review your plan", "Update your résumé with relevant evidence and decide on a date to review your progress."],
];

const roleKey = "lantern-transition-role-v1";

export default function TransitionPlan({ roles, initialRole }: {
  roles: { code: string; title: string }[];
  initialRole: string;
}) {
  const [code, setCode] = useState(initialRole);
  const [completed, setCompleted] = useState<number[]>([]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const role = roles.find((item) => item.code === code);

  useEffect(() => {
    try {
      const active = initialRole || localStorage.getItem(roleKey) || "";
      setCode(active);
      const plan = JSON.parse(localStorage.getItem(`${roleKey}:${active}`) ?? "null");
      setCompleted(Array.isArray(plan?.completed) ? tasks.map((_, index) => index).filter((index) => plan.completed.includes(index)) : []);
      setNotes(typeof plan?.notes === "string" ? plan.notes : "");
    } catch {
      setMessage("Your saved plan couldn’t be loaded.");
    }
  }, [initialRole]);

  function save(nextCompleted: number[], nextNotes: string) {
    try {
      localStorage.setItem(`${roleKey}:${code}`, JSON.stringify({ completed: nextCompleted, notes: nextNotes }));
      localStorage.setItem(roleKey, code);
      setCompleted(nextCompleted);
      setMessage("Plan saved in this browser.");
    } catch {
      setMessage("Your browser couldn’t save the plan. Try again.");
    }
  }

  return (
    <main className="workspace">
      <Link href="/explore" className="text-button">← Explore careers</Link>
      <h1>Plan your next steps</h1>
      {role ? (
        <>
          <p>Exploring <strong>{role.title}</strong>. Start with one small step and adjust as you learn.</p>
          <p>{completed.length} of {tasks.length} steps completed</p>
          <progress aria-label="Transition progress" value={completed.length} max={tasks.length} />
          <div className={styles.grid}>
            <ol className={styles.steps}>
              {tasks.map(([title, description], index) => (
                <li className={styles.card} key={title}>
                  <label>
                    <input type="checkbox" checked={completed.includes(index)} onChange={(event) => save(event.target.checked ? [...completed, index] : completed.filter((value) => value !== index), notes)} />
                    <strong>{title}</strong>
                  </label>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <aside className={styles.card}>
              <h2>Make room for your plan</h2>
              <label htmlFor="plan-notes">Time, support, and questions to investigate</label>
              <textarea id="plan-notes" value={notes} rows={6} maxLength={4000} onChange={(event) => setNotes(event.target.value)} />
              <button className="btn btn-primary" onClick={() => save(completed, notes)}>Save plan</button>
              <p role="status">{message}</p>
              <Link href="/saved" className="text-button">Compare saved roles →</Link>
            </aside>
          </div>
        </>
      ) : (
        <section className={styles.card}>
          <h2>Choose a direction to explore</h2>
          <p>Open a career’s details and choose Plan my next steps to start a checklist for that role.</p>
          <Link className="btn btn-primary" href="/explore">Explore career directions</Link>
          {message && <p role="status">{message}</p>}
        </section>
      )}
    </main>
  );
}
