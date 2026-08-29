import { getProcedure, deleteProcedure } from "@/app/procedure-actions";
import { notFound } from "next/navigation";
import Link from "next/link";

const emotionStyles: Record<string, string> = {
  confident: "bg-sage-100 text-sage-700",
  happy: "bg-sky-100 text-sky-700",
  anxious: "bg-amber-100 text-amber-700",
  overwhelmed: "bg-rose-100 text-rose-700",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;

  const backLink = from ?? "/procedures";

  const procedure = await getProcedure(id);

  if (!procedure) notFound();

  const deleteWithId = deleteProcedure.bind(null, procedure.id);

  return (
    <div className="mx-auto max-w-3xl px-10 py-12">
      <Link
        href={backLink}
        className="mb-8 inline-flex items-center gap-1 text-sm text-ink/40 transition hover:text-ink"
      >
        ← Back
      </Link>

      <div className="rounded-lg border border-black/5 bg-white">
        <div className="flex items-start justify-between border-b border-black/5 px-8 py-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
              Procedure
            </p>
            <h1 className="mt-2 font-serif text-4xl text-ink">{procedure.name}</h1>
            <p className="mt-2 text-sm text-ink/40">
              {procedure.performedAt.toLocaleDateString("en-CA", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize ${
              emotionStyles[procedure.emotion] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {procedure.emotion}
          </span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-black/5 border-b border-black/5">
          <div className="px-8 py-8">
            <p className="text-sm font-medium text-ink/50">Comfort</p>
            <p className="mt-2 font-serif text-5xl text-ink">
              {procedure.comfort}
              <span className="text-2xl text-ink/30"> / 5</span>
            </p>
          </div>
          <div className="px-8 py-8">
            <p className="text-sm font-medium text-ink/50">Enjoyment</p>
            <p className="mt-2 font-serif text-5xl text-ink">
              {procedure.enjoyment}
              <span className="text-2xl text-ink/30"> / 5</span>
            </p>
          </div>
          <div className="px-8 py-8">
            <p className="text-sm font-medium text-ink/50">Performance</p>
            <p className="mt-2 font-serif text-3xl capitalize text-ink">
              {procedure.performanceType}
            </p>
          </div>
        </div>

        <div className="border-b border-black/5 px-8 py-8">
          <p className="mb-2 text-sm font-medium text-ink/50">Notes</p>
          <p className="text-base leading-relaxed text-ink/80">
            {procedure.notes || "No notes recorded for this procedure."}
          </p>
        </div>

        <div className="flex gap-3 px-8 py-8">
          <Link
            href={`/procedures/${id}/edit`}
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