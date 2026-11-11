import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import styles from "../information.module.css";

export const metadata: Metadata = {
  title: "About Us | Lantern",
  description:
    "Learn how Lantern helps people explore career paths and weigh practical trade-offs.",
};

// Edit these cards to change the three main principles.
const highlights = [
  {
    title: "Trade-offs, not perfect matches",
    text: "We help people compare the real-world costs and constraints of different paths instead of ranking them by fit alone.",
  },
  {
    title: "Clarity over certainty",
    text: "We do not promise a single right answer. We help people understand what they can test, what they can afford to learn, and what they can adjust as they go.",
  },
  {
    title: "Insight from people doing the work",
    text: "We value the practical perspective of someone who is already in a role, because that is where the most useful trade-off information usually lives.",
  },
];

const approach = [
  {
    title: "Time and cost",
    text: "We show the realistic time and financial gaps between where you are now and where you want to go, so you can compare paths with your actual circumstances in mind.",
  },
  {
    title: "Real-world constraints",
    text: "We help people weigh location, travel, education requirements, and daily responsibilities alongside salary and growth, because those are the constraints that usually decide what is possible.",
  },
  {
    title: "Practical perspective",
    text: "We value the practical perspective of someone who is already in a role, because that is where the most useful trade-off information usually lives.",
  },
];

const research = [
  {
    title: "Practical constraints",
    text: "Our focus is on the barriers that affect whether a path is viable: time, cost, location, and education requirements.",
  },
  {
    title: "Informed design",
    text: "We plan to use research to shape the questions we ask, the trade-offs we surface, and the guidance we provide.",
  },
  {
    title: "Illustrative examples",
    text: "We may use examples like comparing remote versus local roles, weighing certification time against salary gain, or showing how daily responsibilities change between industries.",
  },
];

// Replace these with your real team names, roles, and bios.
const team = [
  {
    id: "01",
    name: "Name placeholder",
    role: "Role placeholder",
    bio: "Bio placeholder: describe the person’s perspective, what they care about, and how they contribute to Lantern’s approach to guidance.",
  },
  {
    id: "02",
    name: "Name placeholder",
    role: "Role placeholder",
    bio: "Bio placeholder: describe the person’s perspective, what they care about, and how they contribute to Lantern’s approach to guidance.",
  },
  {
    id: "03",
    name: "Name placeholder",
    role: "Role placeholder",
    bio: "Bio placeholder: describe the person’s perspective, what they care about, and how they contribute to Lantern’s approach to guidance.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        {/* Page introduction */}
        <header className={styles.intro}>
          <h1>
            From “where do I start?”
            <br />
            to “I can do this.”
          </h1>
          <p>
            Lantern exists because career decisions are rarely about one perfect
            match. They are about trade-offs, timing, and what you can
            realistically change right now.
          </p>
          <p>
            Our approach brings practical constraints, honest trade-offs, and
            human perspective into the same conversation.
          </p>
        </header>

        {/* Purpose and three principle cards */}
        <section className={styles.section} aria-labelledby="why-heading">
          <div className={styles.label}>Why Lantern exists</div>
          <h2 id="why-heading">
            Career guidance should help you decide, not just discover.
          </h2>
          <p>
            Most people do not need another list of jobs or a personality score.
            They need a clearer way to weigh pay, time, travel, education, and
            where they can realistically work. Lantern was built to give people
            agency around the trade-offs that matter most.
          </p>
          <p>
            Our starting point is simple: the best next step is rarely the one
            that feels most exciting. It is the one that fits your constraints,
            respects your uncertainty, and helps you learn by doing.
          </p>

          <div className={styles.grid}>
            {highlights.map((item, index) => (
              <article className={styles.highlight} key={item.title}>
                <span className={styles.badge} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Practical approach */}
        <section className={styles.section} aria-labelledby="approach-heading">
          <div className={styles.label}>Our approach</div>
          <h2 id="approach-heading">
            We frame decisions around the constraints people actually face.
          </h2>
          <p>
            Career guidance often focuses on what you want. We also look at what
            you can afford, how much time you have, and what you are willing to
            learn. That is where the real decision lives.
          </p>
          <p>
            We organize guidance around the questions people ask when they are
            actually making a choice: how long will this take, how much will it
            cost, where can I do it, and what will I be doing every day.
          </p>
          <div className={styles.grid}>
            {approach.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Yellow statement panel from Figma */}
        <section className={styles.section} aria-labelledby="philosophy-heading">
          <div className={styles.label}>Our philosophy</div>
          <h2 id="philosophy-heading">
            Guidance should give you agency, not a prescription.
          </h2>
          <p>
            We do not believe in one-size-fits-all recommendations or scoring
            systems that imply a single right answer. We believe in helping
            people understand what they are choosing between.
          </p>
          <p>
            Uncertainty is a normal part of career change. Our goal is to make
            that uncertainty useful, so you can test assumptions, learn from
            experience, and adjust your direction as you go.
          </p>
          <div className={styles.statement}>
            <h3>
              We do not tell you what you should do. We help you compare options,
              weigh trade-offs, and identify what you can test next.
            </h3>
            <p>
              We do not hide the unknowns. We surface them early, so you can make
              a more informed decision about what to explore, what to test, and
              what to commit to.
            </p>
          </div>
        </section>

        {/* Research section */}
        <section className={styles.section} aria-labelledby="research-heading">
          <div className={styles.label}>Research and informed design</div>
          <h2 id="research-heading">
            Research should inform decisions, not just validate them.
          </h2>
          <p>
            Our research approach is designed to surface practical constraints,
            real-world trade-offs, and the kinds of questions people ask when
            they are making a choice.
          </p>
          <p>
            We aim to make guidance more grounded, more transparent, and more
            useful for people who are deciding what to do next.
          </p>
          <div className={styles.grid}>
            {research.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Team details come from the array at the top */}
        <section className={styles.section} aria-labelledby="team-heading">
          <h2 id="team-heading" className={styles.label}>
            Meet the team
          </h2>
          <p>
            The people behind Lantern, and the perspectives they bring to
            helping others make clearer career decisions.
          </p>
          <div className={styles.grid}>
            {team.map((person) => (
              <article className={styles.teamCard} key={person.id}>
                <div className={styles.person}>
                  <span className={styles.avatar} aria-hidden="true">
                    {person.id}
                  </span>
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </div>
                </div>
                <p>{person.bio}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Change href if your onboarding entry point changes */}
        <section className={styles.cta} aria-labelledby="start-heading">
          <div>
            <h2 id="start-heading">Ready to explore your next chapter?</h2>
            <p>
              Start with the questions that matter most to you, and let’s build a
              clearer path forward together.
            </p>
          </div>
          <Link href="/sign-up" className={styles.button}>
            Start exploring
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        Your next chapter starts with you
      </footer>
    </div>
  );
}