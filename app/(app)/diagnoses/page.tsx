import Link from "next/link";
import { getDiagnoses } from "@/app/diagnosis-actions";
import DiagnosesListItem from "@/app/ui/diagnoses-list-item";

export default async function Page() {
  const diagnoses = await getDiagnoses();

  const mostRecent =
    diagnoses.length > 0
      ? diagnoses
          .reduce((latest, current) =>
            current.diagnosedAt > latest.diagnosedAt ? current : latest
          )
          .diagnosedAt.toLocaleDateString("en-CA", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
      : "—";

  return (
    <div className="mx-auto max-w-5xl px-10 py-10">
      
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
            Clinical Record
          </p>
          <h1 className="mt-1 font-serif text-3xl text-ink">
            Diagnoses Library
          </h1>
        </div>
        <Link
          href="/specialties"
          className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          + Log Diagnosis
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Total Encountered</p>
          <p className="mt-1 font-serif text-3xl text-ink">
            {diagnoses.length}
          </p>
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Most Recent</p>
          <p className="mt-1 font-serif text-3xl text-ink">{mostRecent}</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-black/5 bg-white">
        <div className="grid grid-cols-[1fr_auto_auto] gap-6 border-b border-black/5 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-ink/40">
          <span>Diagnosis</span>
          <span className="w-32 text-right">Diagnosed At</span>
          <span></span>
        </div>

        {diagnoses.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ink/50">
            No diagnoses recorded yet.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {diagnoses.map((diagnosis) => (
              <DiagnosesListItem key={diagnosis.id} diagnosis={diagnosis} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}