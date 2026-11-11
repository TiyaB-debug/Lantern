"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./priorities.module.css";

const questions = [
  { section: "Your starting point", title: "Where are you starting from?", choices: ["Exploring my options", "Entering the workforce", "Changing careers", "Returning to work"] },
  { section: "Your interests", title: "What kind of work draws you in?", choices: ["Solving problems", "Helping people", "Building or fixing things", "Creating ideas", "Organizing information", "Leading projects"] },
  { section: "Your priorities", title: "What matters most in your next role?", choices: ["Reliable income", "Work-life balance", "Meaningful work", "Learning and progression", "Flexibility", "Working close to home"] },
  { section: "Your time", title: "How much time can you set aside each week?", choices: ["Under two hours", "Two to five hours", "More than five hours", "It varies"] },
  { section: "Where you can work", title: "What work settings are realistic for you?", choices: ["On-site", "Hybrid", "Remote", "Open to any setting"] },
  { section: "Education and experience", title: "What preparation would you consider?", choices: ["Learning on the job", "A short course or certificate", "A longer training program", "A degree", "Still deciding"] },
  { section: "Making the switch", title: "What would make a change easier?", choices: ["A clear entry route", "Keeping my current income", "Building experience first", "Support from someone in the field"] },
  { section: "Looking ahead", title: "What would you like to do first?", choices: ["Research roles", "Talk to someone in the field", "Try a small project", "Compare training options"] },
];

const descriptions = [
  "Steady pay that covers what you need.",
  "Space for life outside of work.",
  "Work that feels worthwhile to you.",
  "Room to build skills and move forward.",
  "More say in when or how you work.",
  "A commute that fits your day.",
];
const storageKey = "lantern-full-assessment-v1";

export default function FullAssessmentPage() {
  const [answers, setAnswers] = useState<string[][]>(() => questions.map(() => []));
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const complete = index === questions.length;
  const question = questions[index];
  const selected = answers[index] ?? [];
  const limit = index === 2 ? 3 : 1;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      const oldPriorities = JSON.parse(localStorage.getItem("lantern-priorities-v1") ?? "null");
      const restored = questions.map(({ choices }, position) => {
        const values = saved?.answers?.[position] ?? (position === 2 ? oldPriorities : null);
        return Array.isArray(values) ? choices.filter((choice) => values.includes(choice)).slice(0, position === 2 ? 3 : 1) : [];
      });
      setAnswers(restored);
      const firstEmpty = restored.findIndex((answer) => answer.length === 0);
      setIndex(firstEmpty < 0 ? questions.length : firstEmpty);
    } catch {
      // The quiz can start fresh if stored answers cannot be read.
    }
  }, []);

  function move(nextIndex: number) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers }));
      setError("");
      setIndex(nextIndex);
      requestAnimationFrame(() => heading.current?.focus());
    } catch {
      setError("This browser couldn’t save your answers. Try again.");
    }
  }

  function choose(choice: string) {
    setAnswers((current) => current.map((values, position) => {
      if (position !== index) return values;
      if (limit === 1) return [choice];
      if (values.includes(choice)) return values.filter((value) => value !== choice);
      return values.length < limit ? [...values, choice] : values;
    }));
  }

  const completed = answers.filter((answer) => answer.length).length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <Link className={styles.brand} href="/dashboard"><span aria-hidden="true">↗</span> Lantern</Link>
          <span className={styles.subtitle}>Your career starting point</span>
        </div>
        <Link className={styles.exit} href="/dashboard">{complete ? "Back to dashboard" : "Exit quiz ×"}</Link>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Assessment progress">
          <h2>Your progress</h2>
          <p className={styles.preview}>{completed} of 8 answered</p>
          <progress className={styles.progress} aria-label="Assessment progress" max={8} value={completed} />
          <ol className={styles.steps}>
            {questions.map(({ section }, position) => (
              <li key={section} aria-current={position === index ? "step" : undefined}>
                <span aria-hidden="true">{answers[position].length && position !== index ? "✓" : position + 1}</span>
                {section}
              </li>
            ))}
            {complete && <li aria-current="step"><span aria-hidden="true">✓</span> Results</li>}
          </ol>
          <p className={styles.tagline}>Big questions.<br />Manageable next steps.</p>
        </aside>

        <main className={styles.main}>
          <p className={styles.eyebrow}><strong>{complete ? "Your starting point" : `Question ${index + 1} of 8`}</strong><span aria-hidden="true">/</span>{complete ? "Results" : question.section}</p>
          <h1 ref={heading} tabIndex={-1}>{complete ? "Here’s what we’ve learned about you" : question.title}</h1>
          {complete ? (
            <>
              <p className={styles.intro}>Use this summary to decide what to look for as you explore career directions.</p>
              <div className={styles.summary}>
                <h2>What matters to you</h2>
                <ul>{answers[2].map((priority) => <li key={priority}>{priority}</li>)}</ul>
                <h2>What to look for next</h2>
                <p>{answers[7][0]}. Keep your available time and preferred work setting in mind.</p>
              </div>
              <footer className={styles.actions}>
                <button type="button" onClick={() => move(0)}>← Review answers</button>
                <Link className="btn btn-primary" href="/explore">Explore career directions →</Link>
              </footer>
            </>
          ) : (
            <>
              {index === 2 && <p className={styles.intro}>Think about what would make a role work for your life right now.</p>}
              <fieldset className={styles.fieldset}>
                <legend>{index === 2 ? "Choose up to three priorities." : "Choose one option."}</legend>
                <p className={styles.count} aria-live="polite">{selected.length} of {limit} selected</p>
                <div className={styles.options}>
                  {question.choices.map((choice, position) => {
                    const checked = selected.includes(choice);
                    return (
                      <label className={styles.option} key={choice}>
                        <input type={limit === 1 ? "radio" : "checkbox"} name={limit === 1 ? "answer" : undefined} checked={checked} disabled={limit > 1 && !checked && selected.length >= limit} onChange={() => choose(choice)} />
                        <span><strong>{choice}</strong>{index === 2 && <small>{descriptions[position]}</small>}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {index === 2 && <p className={styles.note}>ⓘ Your priorities can change. Choose what matters to you today.</p>}
              <footer className={styles.actions}>
                {index === 0 ? <Link href="/dashboard">← Back</Link> : <button type="button" onClick={() => move(index - 1)}>← Back</button>}
                <button type="button" disabled={!selected.length} onClick={() => move(index + 1)}>{index === 7 ? "See results" : "Continue"} →</button>
              </footer>
            </>
          )}
          {error && <p role="alert">{error}</p>}
        </main>
      </div>
    </div>
  );
}
