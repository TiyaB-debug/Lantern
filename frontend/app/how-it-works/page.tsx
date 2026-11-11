import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import styles from "../information.module.css";

export const metadata: Metadata = {
  title: "How It Works | Lantern",
  description:
    "Start where you are, find a practical next step, and build momentum with Lantern.",
};

// Edit these entries to update the three process steps.
const steps = [
  {
    number: "01",
    title: "Start with where you are.",
    description:
      "Tell us what interests you, what you’ve tried, and what feels uncertain. “I’m not sure yet” is a useful answer.",
    note: "A short check-in to find your starting point",
  },
  {
    number: "02",
    title: "Get a next step that fits.",
    description:
      "See a suggested focus and a first activity based on your answers—not a one-size-fits-all to-do list.",
    note: "Understand the reasons behind your next step",
  },
  {
    number: "03",
    title: "Build momentum, your way.",
    description:
      "Save your plan. Work through short activities and adjust your direction as you learn.",
    note: "Keep your profile and progress in one place",
  },
];

export default function HowItWorksPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={`${styles.main} ${styles.howMain}`}>
        {/* Main heading from Figma */}
        <header className={styles.intro}>
          <h1>
            From “where do I start?”
            <br />
            to “I can do this.”
          </h1>
        </header>

        {/* Numbered steps stack vertically on smaller screens */}
        <ol className={`${styles.grid} ${styles.steps}`}>
          {steps.map((step) => (
            <li className={styles.step} key={step.number}>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.number}>{step.number}</span>
                <span className={styles.line} />
                {/* Add your custom step icon here later. */}
              </div>

              <h2>{step.title}</h2>
              <p>{step.description}</p>
              <p className={styles.note}>{step.note}</p>
            </li>
          ))}
        </ol>
      </main>

      <footer className={`${styles.footer} ${styles.howFooter}`}>
                Your next chapter starts with you
      </footer>
    </div>
  );
}