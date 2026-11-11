"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import shared from "../sign-up/signup.module.css";
import styles from "./signin.module.css";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const fields = new FormData(form);

    try {
      const supabase = createClient();

      // Check the credentials and save the session in cookies.
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: String(fields.get("email") ?? "").trim(),
          password: String(fields.get("password") ?? ""),
        });

      if (signInError) {
        setError(
          signInError.code === "email_not_confirmed"
            ? "Please confirm your email before signing in."
            : "We couldn’t sign you in. Check your email and password and try again."
        );
        return;
      }

      form.reset();
      setShowPassword(false);
      setSignedIn(true);

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("We couldn’t connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={shared.page}>
      {/* Add your custom logo beside the wordmark later. */}
      <header className={shared.header}>
        <Link href="/" className={shared.brand}>
          Lantern
        </Link>
      </header>

      <main className={shared.main}>
        <section
          className={`${shared.card} ${styles.card}`}
          aria-labelledby="signin-title"
        >
          <div className={shared.content}>
            <div className={shared.introduction}>
              <h1 id="signin-title">Welcome back.</h1>
              <p className={styles.description}>
                Sign in to Lantern to continue exploring your career direction.
              </p>
            </div>

            {signedIn ? (
              <div className={shared.success} role="status">
                You’re signed in! Opening your dashboard…
              </div>
            ) : (
              <form onSubmit={handleSignIn} className={shared.form}>
                <fieldset className={shared.fields} disabled={loading}>
                  <div className={shared.field}>
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className={shared.field}>
                    <label htmlFor="password">Password</label>

                    <div className={shared.password}>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                      />

                      {/* Replace this text with your custom eye icon later. */}
                      <button
                        type="button"
                        className={`${shared.visibility} ${styles.toggle}`}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        aria-controls="password"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <Link
                      href="/forgot-password"
                      className={styles.recovery}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </fieldset>

                {error && (
                  <p className={shared.error} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className={shared.submit}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>
            )}

            <div className={styles.alternative}>
              <p>New to Lantern?</p>
              <Link href="/sign-up" className={styles.createAccount}>
                Create an account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={shared.footer}>
        <p>© {new Date().getFullYear()} Lantern</p>
        <p>Your next chapter starts with you</p>
      </footer>
    </div>
  );
}
