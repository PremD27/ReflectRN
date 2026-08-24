import Link from "next/link";
import { getProcedures } from "@/app/procedure-actions";
import ProcedureListItem from "@/app/ui/procedures-list-item";

export default async function Page() {
  const procedures = await getProcedures();

  const avgComfort = procedures.length
    ? (procedures.reduce((sum, p) => sum + p.comfort, 0) / procedures.length).toFixed(1)
    : "—";
  const avgEnjoyment = procedures.length
    ? (procedures.reduce((sum, p) => sum + p.enjoyment, 0) / procedures.length).toFixed(1)
    : "—";

  return (
    <div className="mx-auto max-w-5xl px-10 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
            Reflective Practice
          </p>
          <h1 className="mt-1 font-serif text-3xl text-ink">Procedure Log</h1>
        </div>
        <Link
          href="/specialties"
          className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          + Log Procedure
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Total Logged</p>
          <p className="mt-1 font-serif text-3xl text-ink">{procedures.length}</p>
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Avg. Comfort</p>
          <p className="mt-1 font-serif text-3xl text-ink">{avgComfort}</p>
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Avg. Enjoyment</p>
          <p className="mt-1 font-serif text-3xl text-ink">{avgEnjoyment}</p>
        </div>
      </div>

      <div className="rounded-lg border border-black/5 bg-white">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 border-b border-black/5 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-ink/40">
          <span>Procedure</span>
          <span className="w-20 text-right">Comfort</span>
          <span className="w-20 text-right">Enjoyment</span>
          <span>Emotion</span>
          <span></span>
        </div>

        {procedures.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ink/50">
            No procedures logged yet.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {procedures.map((procedure) => (
              <ProcedureListItem key={procedure.id} procedure={procedure} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}