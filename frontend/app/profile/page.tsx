import { redirect } from "next/navigation";
import LanternNav from "@/components/LanternNav";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ signOut?: string }> }) {
  const status = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  async function signOut() {
    "use server";
    const client = await createClient();
    const { error } = await client.auth.signOut();
    if (error) redirect("/profile?signOut=failed");
    redirect("/sign-in");
  }

  return (
    <>
      <LanternNav />
      <main className="workspace narrow">
        <h1>Your profile</h1>
        <p>Signed in as <strong>{user.email}</strong></p>
        <p>Your assessment answers, saved roles, and transition plan are stored in this browser.</p>
        {status.signOut === "failed" && <p role="alert">Sign-out failed. Please try again.</p>}
        <form action={signOut}><button className="btn btn-secondary">Sign out</button></form>
      </main>
    </>
  );
}
