import { createDiagnosis } from "@/app/diagnosis-actions";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const today = new Date().toISOString().split("T")[0];
  const { specialtyId, from } = await searchParams;

  if (!specialtyId) redirect("/specialties");

  const createDiagnosisFromSpecialtyId = createDiagnosis.bind(null, specialtyId, from);

  return (
    <div className="mx-auto max-w-xl px-10 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-sage-600">Diagnosis</p>
      <h1 className="mt-1 mb-8 font-serif text-3xl text-ink">Add a Diagnosis</h1>

      <form
        action={createDiagnosisFromSpecialtyId}
        className="rounded-lg border border-black/5 bg-white p-8"
      >
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-ink/70">Diagnosis name</label>
          <input
            type="text"
            name="diagnosis-name"
            placeholder="e.g. Irritable Bowel Syndrome"
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-ink/70">Notes</label>
          <textarea
            name="diagnosis-notes"
            rows={4}
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-ink/70">Date diagnosed</label>
          <input
            type="date"
            name="diagnosis-at"
            defaultValue={today}
            className="rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          Save Diagnosis
        </button>
      </form>
    </div>
  );
}