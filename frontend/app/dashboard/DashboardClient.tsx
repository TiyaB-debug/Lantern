"use client";

import Link from "next/link";
import LanternNav from "@/components/LanternNav";
import "./dashboard.css";

function Icon({
  name,
  width = 20,
  height = width,
}: {
  name: string;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src={`/figma/dashboard/${name}.svg`}
      width={width}
      height={height}
      alt=""
    />
  );
}

export default function DashboardClient() {
  return (
    <div className="dashboard-page">
      <LanternNav />
      <main className="dashboard-main">
        <section className="dashboard-welcome" aria-labelledby="welcome-title">
          <p className="dashboard-eyebrow">
            <span />
            YOUR CAREER STARTING POINT
          </p>
          <h1 id="welcome-title">Welcome to Lantern</h1>
          <p>
            You don’t need to have it all figured out. Start with what matters
            to you, then explore what could come next.
          </p>
        </section>
        <div className="dashboard-start">
          <section className="dashboard-routes" aria-labelledby="route-title">
            <div className="dashboard-route-intro">
              <p className="dashboard-kicker">ASSESS · START HERE</p>
              <h2 id="route-title">Choose your route</h2>
              <p>
                A little reflection now can make your next step clearer. Choose
                the depth that suits you.
              </p>
            </div>
            <div className="dashboard-route-options">
              <div className="dashboard-route">
                <h3>
                  <Icon name="clock" />
                  5-minute check
                </h3>
                <p className="dashboard-route-meta">A quick place to begin</p>
                <p>
                  Reflect on your interests and priorities for an initial
                  personal summary and directions to explore.
                </p>
                <Link className="dashboard-button" href="/assessment">
                  Start the 5-minute check
                  <Icon name="arrow-white" width={12.5521} height={12.2} />
                </Link>
              </div>
              <div className="dashboard-route">
                <h3>
                  <Icon name="clipboard" />
                  Full assessment
                </h3>
                <p className="dashboard-route-meta">
                  8 sections · A deeper look
                </p>
                <p>
                  Look more closely at your strengths, experience and working
                  preferences to build a fuller picture.
                </p>
                <Link className="dashboard-button dashboard-outline" href="/assessment/priorities">
                  Start full assessment
                  <Icon name="arrow-blue" width={12.5521} height={12.2} />
                </Link>
              </div>
            </div>
            <p className="dashboard-route-footnote">
              Your answers lead to a personal summary, then career directions to
              investigate—not a prescribed match.
            </p>
          </section>
          <aside className="dashboard-history" aria-labelledby="history-title">
            <h2 id="history-title">Assessment progress / history</h2>
            <div className="dashboard-history-body">
              <Icon name="history" width={25} />
              <h3>Your quick check</h3>
              <p>Completed answers are saved in this browser.</p>
              <Link href="/results">View your results →</Link>
            </div>
            <div className="dashboard-reassessment">
              <div>
                <Icon name="lock" width={15} />
                <strong>Reassessment</strong>
                <span>Not yet available</span>
              </div>
              <p>
                Complete an assessment first. You can revisit it when your
                priorities change.
              </p>
            </div>
          </aside>
        </div>
        <section className="dashboard-journey" aria-labelledby="journey-title">
          <div className="dashboard-journey-intro">
            <h2 id="journey-title">Your next chapter, at your pace</h2>
            <p>You can explore roles before taking an assessment.</p>
          </div>
          <div className="dashboard-destinations">
            <article>
              <h3>
                <Icon name="compass" />
                Explore
              </h3>
              <p>
                Browse career directions and open role details to learn about
                the work, entry routes and questions to ask.
              </p>
              <Link href="/explore" className="dashboard-text-link">
                Explore career directions
                <Icon name="arrow-blue" width={12.5521} height={12.2} />
              </Link>
            </article>
            <article>
              <h3>
                <Icon name="columns" />
                Compare
              </h3>
              <p>
                Put roles side by side to weigh up the work and what matters to
                you. Explore roles first to find options.
              </p>
              <Link href="/explore">Start by exploring roles</Link>
            </article>
            <article>
              <h3>
                <Icon name="route" />
                My Transition
              </h3>
              <p>
                Turn a direction into manageable next steps. Choose a role to
                investigate before building your transition plan.
              </p>
              <Link href="/transition">Open your transition plan</Link>
            </article>
          </div>
        </section>
        <footer className="dashboard-footer">
          <p>
            <span />
            Big questions. Manageable next steps.
          </p>
          <p>A starting point, not a fixed path. You choose the direction.</p>
        </footer>
      </main>

    </div>
  );
}
