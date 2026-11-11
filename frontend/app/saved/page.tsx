import LanternNav from "@/components/LanternNav";
import CareerExplorer from "@/components/CareerExplorer";
export default function Saved() {
  return (
    <>
      <LanternNav />
      <main className="workspace">
        <p className="eyebrow">Keep exploring</p>
        <h1>Compare your directions</h1>
        <p>Saved on this browser. Clearing browser data removes this list.</p>
        <CareerExplorer savedOnly />
      </main>
    </>
  );
}
