import LanternNav from "@/components/LanternNav";
import { occupations } from "@/lib/catalog";
import TransitionPlan from "./TransitionPlan";

export default async function TransitionPage({ searchParams }: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const roles = occupations.map(({ onet_code, title }) => ({ code: onet_code, title }));
  const chosen = roles.find(({ code }) => code === role);

  return (
    <>
      <LanternNav />
      <TransitionPlan roles={roles} initialRole={chosen?.code ?? ""} />
    </>
  );
}
