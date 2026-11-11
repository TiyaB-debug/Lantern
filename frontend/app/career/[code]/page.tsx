import Link from "next/link";
import { notFound } from "next/navigation";
import LanternNav from "@/components/LanternNav";
import { occupations } from "@/lib/catalog";
export default async function Career({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const o = occupations.find((o) => o.onet_code === code);
  if (!o) notFound();
  return (
    <>
      <LanternNav />
      <main className="workspace narrow">
        <Link href="/explore" className="text-button">
          ← Explore careers
        </Link>
        <p className="eyebrow">Career explorer · {o.onet_code}</p>
        <h1>{o.title}</h1>
        <p>{o.description}</p>
        <div className="actions">
          <Link className="btn btn-primary" href={`/transition?role=${encodeURIComponent(o.onet_code)}`}>Plan my next steps</Link>
          <Link className="btn btn-secondary" href="/saved">Compare saved roles</Link>
        </div>
        <h2>Preparation</h2>
        <p>
          Job zone {o.job_zone} of 5. This summarizes typical education,
          training, and experience; it does not determine your eligibility or
          your personal transition time.
        </p>
        <h2>Skills used in this occupation</h2>
        <p>
          Source scores are normalized to 0–1. Importance and required level are
          distinct; neither is a rating of your ability.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Importance</th>
                <th>Required level</th>
              </tr>
            </thead>
            <tbody>
              {o.skills.map((s) => (
                <tr key={s.name}>
                  <th>{s.name}</th>
                  <td>{s.importance.toFixed(2)}</td>
                  <td>{s.level.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Pay and evidence</h2>
        <p>
          Wage data is unavailable in this dataset. Occupational median pay,
          when added, will not represent a career changer’s starting salary.
        </p>
        <p>
          Interest score source: {o.interest_source}. We have not yet evaluated
          your skill gaps, work values, lifestyle requirements, or future
          outlook.
        </p>
        <p className="fine-print">
          Contains O*NET Database 31.0 information, used under CC BY 4.0; source
          scores transformed by Lantern.{" "}
          <a href="https://www.onetcenter.org/database.html">
            Source and license details
          </a>
          .
        </p>
      </main>
    </>
  );
}
