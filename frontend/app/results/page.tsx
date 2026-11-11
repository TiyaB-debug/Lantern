import LanternNav from "@/components/LanternNav";
import CareerExplorer from "@/components/CareerExplorer";
export default function Results() {
  return (
    <>
      <LanternNav />
      <main className="workspace">
        <p className="eyebrow">Your starting point</p>
        <h1>Careers to explore</h1>
        <CareerExplorer />
      </main>
    </>
  );
}
