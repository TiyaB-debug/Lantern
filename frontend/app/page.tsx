import Link from "next/link";

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 10.5l7-7M4.5 3.5h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 9.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="logo" aria-label="Lantern home">
            <svg
              width="29"
              height="29"
              viewBox="0 0 28.9 28.9"
              fill="none"
              aria-hidden="true"
            >
              <rect
                width="28.9"
                height="28.9"
                rx="6.8"
                fill="#F4D35E"
              />
              <path
                d="M18.8764 18.8763V10.0236H10.0236M18.8764 10.0236L10.0236 18.8763"
                stroke="#000080"
                strokeWidth="1.445"
                strokeLinecap="round"
              />
            </svg>

            <span className="logo-word">Lantern</span>
          </Link>

          <nav className="nav" aria-label="Main navigation">
            <Link href="/how-it-works" className="nav-opt">
              How it works
            </Link>

            <Link href="/about" className="nav-opt">
              About Us
            </Link>

            <Link href="/sign-in" className="nav-signin">
              Sign in
            </Link>

            <Link href="/sign-up" className="btn btn-primary">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="landing">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" aria-hidden="true" />
              For your next chapter
            </p>

            <h1 className="hero-title">
              <span>Your future.</span>
              <span>A little clearer.</span>
              <span>One step closer.</span>
            </h1>

            <p className="lede">
              Discover careers that connect with your interests, understand
              what they involve, and find a starting point that feels right
              for you.
            </p>

            <div className="actions">
              <Link
                href="/assessment"
                className="btn btn-primary btn-sm"
              >
                Find my starting point
                <Arrow />
              </Link>

              <Link
                href="/how-it-works"
                className="btn btn-yellow btn-sm"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <article className="plan-card" aria-label="Sample career plan">
              <header className="plan-head">
                <h2>Your career plan</h2>
                <span className="plan-tag">Sample</span>
              </header>

              <p className="plan-sub">
                A starting point, not a final answer.
              </p>

              <div className="plan-section plan-priorities">
                <h3>Your priorities</h3>

                <ul className="dot-list">
                  <li>Understand people</li>
                  <li>Make a meaningful difference</li>
                  <li>Keep learning as you go</li>
                </ul>
              </div>

              <div className="plan-section plan-role">
                <h3>A potential role to explore</h3>
                <p className="role-name">User researcher</p>

                <p className="role-desc">
                  Explore how listening to people can help shape better
                  products and services.
                </p>

                <div className="next-step">
                  <div className="next-step-top">
                    <span className="next-step-label">
                      Your next step
                    </span>

                    <span className="next-step-time">
                      20 minutes
                    </span>
                  </div>

                  <p className="next-step-title">
                    Try a short research conversation
                  </p>

                  <p className="next-step-desc">
                    Ask a classmate about an app they use. Write down one
                    frustration and one idea to improve it.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <section className="strip landing-strip" aria-label="What Lantern offers">
        <div className="wrap strip-inner">
          <p className="strip-lead">
            Big questions.
            <br />
            Manageable next steps.
          </p>

          <span className="strip-rule" aria-hidden="true" />

          <ul className="strip-list">
            <li>
              <Check />
              Made for students &amp; recent grads
            </li>

            <li>
              <Check />
              Built around your interests
            </li>

            <li>
              <Check />
              Explore at your own pace
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}