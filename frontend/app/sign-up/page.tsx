"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import styles from "./signup.module.css";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setError("");
    setMessage("");

    const form = event.currentTarget;
    const fields = new FormData(form);

    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const password = String(fields.get("password") ?? "");

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    // Change this rule together with the password hint below.
    if (
      password.length < 8 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError("Use at least 8 characters, including a letter and a number.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Supabase manages the password; name is saved as user metadata.
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      // Email confirmation settings determine whether a session is returned.
      setMessage(
        data.session
          ? "Your account is ready. You’re signed in."
          : "Check your email for a confirmation link. If you already have an account, sign in instead."
      );

      form.reset();
      setShowPassword(false);
    } catch {
      setError("We couldn’t connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* Figma uses a logo-only header on account pages. */}
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Lantern home">
          <img src="/auth/brand-mark.svg" alt="" width={34} height={34} />
          <span>Lantern</span>
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="signup-title">
          <div className={styles.content}>
            <div className={styles.introduction}>
              <h1 id="signup-title">Create your account</h1>
              <p>Join Lantern to start exploring your career direction.</p>
            </div>

            <form onSubmit={handleSignUp} className={styles.form}>
              <fieldset className={styles.fields} disabled={loading}>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    maxLength={120}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="password">Password</label>

                  <div className={styles.password}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      aria-describedby="password-hint"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className={styles.visibility}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      aria-controls="password"
                    >
                      <img
                        src="/auth/show-password.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                    </button>
                  </div>

                  <p id="password-hint" className={styles.hint}>
                    Use at least 8 characters, including a letter and a number.
                  </p>
                </div>
              </fieldset>

              {/* Errors and success messages are announced to screen readers. */}
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

              {message && (
                <p className={styles.success} role="status">
                  {message}
                </p>
              )}

              <div className={styles.action}>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={loading || Boolean(message)}
                  aria-busy={loading}
                >
                  {loading ? "Creating account…" : "Create account"}
                </button>

                <p className={styles.legal}>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms">Terms</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </div>
            </form>

            <p className={styles.alternative}>
              Already have an account? <Link href="/sign-in">Sign in</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Footer stays below the content on smaller screens. */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Lantern</p>
        <p>Your next chapter starts with you</p>
      </footer>
    </div>
  );
}