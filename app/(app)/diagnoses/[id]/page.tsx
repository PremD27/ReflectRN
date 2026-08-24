import { deleteDiagnosis, getDiagnosis } from "@/app/diagnosis-actions";
import Link from "next/link";
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

  const backlink = from ?? "/diagnoses";
  const editHref = from ? `/diagnoses/${id}/edit?from=${from}` : `/diagnoses/${id}/edit`;

  const diagnosis = await getDiagnosis(id);

  if (!diagnosis) notFound();

  const deleteWithId = deleteDiagnosis.bind(null, diagnosis.specialtyId, id, from);

  return (
    <div className="mx-auto max-w-3xl px-10 py-12">
      <Link
        href={backlink}
        className="mb-8 inline-flex items-center gap-1 text-sm text-ink/40 transition hover:text-ink"
      >
        ← Back
      </Link>

      <div className="rounded-lg border border-black/5 bg-white">
        <div className="border-b border-black/5 px-8 py-8">
          <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
            Diagnosis
          </p>
          <h1 className="mt-2 font-serif text-4xl text-ink">{diagnosis.name}</h1>
          <p className="mt-2 text-sm text-ink/40">
            {diagnosis.diagnosedAt.toLocaleDateString("en-CA", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="border-b border-black/5 px-8 py-8">
          <p className="mb-2 text-sm font-medium text-ink/50">Notes</p>
          <p className="text-base leading-relaxed text-ink/80">
            {diagnosis.notes || "No notes recorded for this diagnosis."}
          </p>
        </div>

        <div className="flex gap-3 px-8 py-8">
          <Link
            href={editHref}
            className="rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-black/5"
          >
            Edit
          </Link>
          <form action={deleteWithId}>
            <button
              type="submit"
              className="rounded-lg border border-rose-200 bg-white px-5 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}