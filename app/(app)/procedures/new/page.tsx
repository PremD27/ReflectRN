import { createProcedure } from "@/app/procedure-actions";
import ComfortSlider from "@/app/ui/comfort-slider";
import EnjoymentSlider from "@/app/ui/enjoyment-slider";
import EmotionSelector from "@/app/ui/emotion-selector";
import { redirect } from "next/navigation";
import PerformanceTypeSelector from "@/app/ui/performance-type-selector";

export default async function Page({ searchParams } : { searchParams: Promise<{ [key: string]: string | undefined }> } ) {
  const today = new Date().toISOString().split("T")[0];
  const { specialtyId, from } = await searchParams;

  if (!specialtyId) redirect('/specialties');

  const createProcedureFromSpecialtyId = createProcedure.bind(null, specialtyId, from);

  
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 border-b border-black/10 pb-4 font-serif text-3xl text-ink">
        Log a Procedure
      </h1>

      <form action={createProcedureFromSpecialtyId} className="flex flex-col gap-6 rounded-xl border border-black/5 bg-white p-8 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Procedure name</label>
          <input
            type="text"
            name="procedure-name"
            placeholder="e.g. IV Insertion"
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <ComfortSlider />
        <EnjoymentSlider />
        <EmotionSelector />
        <PerformanceTypeSelector />

        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Notes</label>
          <textarea
            name="procedure-notes"
            rows={4}
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink/70">Date performed</label>
          <input
            type="date"
            name="procedure-performedAt"
            defaultValue={today}
            className="rounded-lg border border-black/10 px-4 py-2 text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          Save Procedure
        </button>
      </form>
    </div>
  );
}