import Link from "next/link";
import { getDiagnosesBySpecialty } from "@/app/diagnosis-actions";
import DiagnosesListItem from "@/app/ui/diagnoses-list-item";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const diagnoses = await getDiagnosesBySpecialty(id);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link
          href={`/diagnoses/new?specialtyId=${id}&from=/specialties/${id}/diagnoses`}
          className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          + Diagnosis
        </Link>
      </div>

      <div className="rounded-lg border border-black/5 bg-white">
        {diagnoses.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ink/50">No diagnoses logged yet.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {diagnoses.map((diagnosis) => (
              <DiagnosesListItem
                key={diagnosis.id}
                diagnosis={diagnosis}
                from={`/specialties/${id}/diagnoses`}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}