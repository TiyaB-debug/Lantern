import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = { title: "Dashboard | Lantern" };

export default async function DashboardPage() {
  const supabase = await createClient();
  // Verify the user on the server; never trust a browser-only session check.
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/sign-in");
  return <DashboardClient />;
}

