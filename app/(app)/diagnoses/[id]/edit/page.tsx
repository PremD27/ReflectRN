import { getDiagnosis, updateDiagnosis } from "@/app/diagnosis-actions";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;

  const diagnosis = await getDiagnosis(id);

  if (!diagnosis) notFound();

  const updateWithId = updateDiagnosis.bind(null, diagnosis.specialtyId, id, from);

  return (
    <div className="mx-auto max-w-xl px-10 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-sage-600">Diagnosis</p>
      <h1 className="mt-1 mb-8 font-serif text-3xl text-ink">Edit Diagnosis</h1>

      <form
        action={updateWithId}
        className="rounded-lg border border-black/5 bg-white p-8"
      >
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-ink/70">Diagnosis name</label>
          <input
            type="text"
            name="diagnosis-name"
            defaultValue={diagnosis.name}
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-ink/70">Notes</label>
          <textarea
            name="diagnosis-notes"
            rows={4}
            defaultValue={diagnosis.notes ?? ""}
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-ink/70">Date diagnosed</label>
          <input
            type="date"
            name="diagnosis-at"
            defaultValue={diagnosis.diagnosedAt.toISOString().split("T")[0]}
            className="rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}