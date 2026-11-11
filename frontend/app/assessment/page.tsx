"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LanternNav from "@/components/LanternNav";
import { questions } from "@/lib/matching.mjs";
import { readProfile, saveProfile } from "@/lib/storage";
const options = [
  "Not interested",
  "A little interested",
  "Somewhat interested",
  "Interested",
  "Very interested",
];
export default function Assessment() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [step, setStep] = useState(0);
  const [maxZone, setMaxZone] = useState(5);
  const [error, setError] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const p = readProfile();
    if (p) {
      setAnswers(p.answers);
      setMaxZone(p.maxZone);
    }
  }, []);
  useEffect(() => {
    title.current?.focus();
  }, [step]);
  function finish() {
    try {
      saveProfile({ version: 1, answers, maxZone });
      router.push("/results");
    } catch {
      setError(
        "Your browser could not save your answers. Enable site storage and try again.",
      );
    }
  }
  const reviewing = step === questions.length + 1;
  return (
    <>
      <LanternNav />
      <main className="workspace narrow">
        <p className="eyebrow">Quick career exploration</p>
        <p>
          Step {step + 1} of {questions.length + 2}
        </p>
        <progress
          aria-label="Assessment progress"
          max={questions.length + 2}
          value={step + 1}
        />
        <h1 ref={title} tabIndex={-1}>
          {reviewing
            ? "Does this sound like you?"
            : step === questions.length
              ? "How much preparation would you consider?"
              : "How interesting does this sound?"}
        </h1>
        {step < questions.length ? (
          <fieldset className="question">
            <legend>{questions[step][1]}</legend>
            <p>
              Think about the activity itself, regardless of salary or your
              current skills.
            </p>
            <div className="choice-list">
              {options.map((label, value) => (
                <label
                  className={`choice ${answers[step] === value ? "selected" : ""}`}
                  key={label}
                >
                  <input
                    type="radio"
                    name={`question-${step}`}
                    value={value}
                    checked={answers[step] === value}
                    onChange={() =>
                      setAnswers((a) =>
                        a.map((old, i) => (i === step ? value : old)),
                      )
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : reviewing ? (
          <>
            <p>
              Review or edit your answers before exploring careers. These
              describe interests, not demonstrated ability.
            </p>
            <ul className="review-list">
              {questions.map((q, i) => (
                <li key={i}>
                  <span>
                    {q[1]}
                    <br />
                    <strong>{options[answers[i]]}</strong>
                  </span>
                  <button className="text-button" onClick={() => setStep(i)}>
                    Edit<span className="sr-only"> answer {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p>
              Preparation filter: include job zones 1 through {maxZone}.{" "}
              <button
                className="text-button"
                onClick={() => setStep(questions.length)}
              >
                Edit preparation
              </button>
            </p>
          </>
        ) : (
          <>
            <p>
              Job zones summarize education, experience, and training. This is
              an exploration filter, not an eligibility assessment or a
              prediction of how long your transition will take.
            </p>
            <label htmlFor="zone">Maximum preparation category</label>
            <select
              id="zone"
              value={maxZone}
              onChange={(e) => setMaxZone(Number(e.target.value))}
            >
              {[
                "Little or no preparation",
                "Some preparation",
                "Medium preparation",
                "Considerable preparation",
                "Extensive preparation",
              ].map((label, i) => (
                <option key={label} value={i + 1}>
                  Zone {i + 1} — {label}
                  {i === 4 ? " (include all careers)" : ""}
                </option>
              ))}
            </select>
          </>
        )}
        {error && <p role="alert">{error}</p>}
        <div className="actions">
          <button
            className="btn btn-secondary"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            disabled={step < questions.length && answers[step] < 0}
            onClick={() => (reviewing ? finish() : setStep((s) => s + 1))}
          >
            {reviewing ? "Explore my matches" : "Continue"}
          </button>
        </div>
        <p className="fine-print">
          Prototype: 12 original interest prompts. This is not a validated
          assessment. Answers are saved on this browser when you finish; there
          is no account or cross-device sync.
        </p>
      </main>
    </>
  );
}
