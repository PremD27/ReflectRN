import { getComfortOverTime, getDashboardStats, getEmotionBreakdown, getProceduresOverTime, getRecentDiagnoses, getRecentProcedures } from "@/app/dashboard-actions";
import ComfortChart from "@/app/ui/ComfortChart";
import EmotionChart from "@/app/ui/EmotionsChart";
import ProcedureChart from "@/app/ui/ProcedureChart";

export default async function Page() {
  const [stats, proceduresOverTime, comfortOverTime, emotionBreakdown, recentProcedures, recentDiagnoses] = await Promise.all([
    getDashboardStats(),
    getProceduresOverTime(),
    getComfortOverTime(),
    getEmotionBreakdown(),
    getRecentProcedures(),
    getRecentDiagnoses(),
  ]);

    const emotionStyles: Record<string, string> = {
        confident: "bg-sage-100 text-sage-700",
        happy: "bg-sky-100 text-sky-700",
        anxious: "bg-amber-100 text-amber-700",
        overwhelmed: "bg-rose-100 text-rose-700",
    };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10 lg:py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
          Overview
        </p>
        <h1 className="mt-1 font-serif text-3xl text-ink">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Total Procedures</p>
          <p className="mt-1 font-serif text-3xl text-ink">{stats.totalProcedures}</p>
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Total Diagnoses</p>
          <p className="mt-1 font-serif text-3xl text-ink">{stats.totalDiagnoses}</p>
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Avg. Comfort</p>
          <p className="mt-1 font-serif text-3xl text-ink">{stats.avgComfort}/5</p>
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="text-xs font-medium text-ink/50">Avg. Enjoyment</p>
          <p className="mt-1 font-serif text-3xl text-ink">{stats.avgEnjoyment}/5</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink/40">
            Procedures Over Time
          </p>
          <ProcedureChart data={proceduresOverTime} />
        </div>
        <div className="rounded-lg border border-black/5 bg-white px-5 py-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink/40">
            Emotion Breakdown
          </p>
          <EmotionChart data={emotionBreakdown} />
        </div>
      </div>

      {/* Comfort over time */}
      <div className="mb-6 rounded-lg border border-black/5 bg-white px-5 py-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink/40">
          Comfort Over Time
        </p>
        <ComfortChart data={comfortOverTime} />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-black/5 bg-white">
          <div className="border-b border-black/5 px-5 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
              Recent Procedures
            </p>
          </div>
          {recentProcedures.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-ink/40">
              No procedures logged yet.
            </p>
          ) : (
            <ul className="divide-y divide-black/5">
              {recentProcedures.map((procedure) => (
                <li key={procedure.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{procedure.name}</p>
                    <p className="text-xs text-ink/40">
                      {procedure.performedAt.toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ink/50">
                      Comfort {procedure.comfort}/5
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        emotionStyles[procedure.emotion] ?? "bg-gray-100 text-gray-700"
                    }`}>
                      {procedure.emotion}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize "bg-gray-100 text-gray-700"`}>
                      {procedure.performanceType}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-black/5 bg-white">
          <div className="border-b border-black/5 px-5 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
              Recent Diagnoses
            </p>
          </div>
          {recentDiagnoses.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-ink/40">
              No diagnoses recorded yet.
            </p>
          ) : (
            <ul className="divide-y divide-black/5">
              {recentDiagnoses.map((diagnosis) => (
                <li key={diagnosis.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{diagnosis.name}</p>
                    <p className="text-xs text-ink/40">
                      {diagnosis.diagnosedAt.toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}