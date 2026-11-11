import LanternNav from "@/components/LanternNav";
import CareerExplorer from "@/components/CareerExplorer";
export const metadata = { title: "Explore career directions | Lantern" };
export default function Explore() {
  return (
    <><LanternNav /><main className="workspace">
      <h1>Explore career directions</h1>
      <p>
        Browse careers without taking an assessment. This list is alphabetical,
        not a personalized ranking. Save roles to compare them later.
      </p>
      <CareerExplorer browse />
    </main></>
  );
}
