import Link from "next/link";
import { getProceduresBySpecialty } from "@/app/procedure-actions";
import ProcedureListItem from "@/app/ui/procedures-list-item";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const procedures = await getProceduresBySpecialty(id);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link
          href={`/procedures/new?specialtyId=${id}&from=/specialties/${id}`}
          className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          + Procedure
        </Link>
      </div>

      <div className="rounded-lg border border-black/5 bg-white">
        {procedures.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ink/50">No procedures logged yet.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {procedures.map((procedure) => (
              <ProcedureListItem
                key={procedure.id}
                procedure={procedure}
                from={`/specialties/${id}`}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}