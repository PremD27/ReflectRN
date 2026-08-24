import Link from "next/link";
import { getSpecialties } from "@/app/specialty-actions";
import SpecialtyListItem from "@/app/ui/specialty-list-item";

export default async function Page() {
  const specialties = await getSpecialties();

  return (
    <div className="mx-auto max-w-5xl px-10 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-sage-600">
            Organization
          </p>
          <h1 className="mt-1 font-serif text-3xl text-ink">Specialties</h1>
        </div>
        <Link
          href="/specialties/new"
          className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          + New Specialty
        </Link>
      </div>

      {specialties.length === 0 ? (
        <p className="rounded-lg border border-black/5 bg-white px-6 py-10 text-center text-sm text-ink/50">
          No specialties created yet.
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {specialties.map((specialty) => (
            <SpecialtyListItem key={specialty.id} specialty={specialty} />
          ))}
        </ul>
      )}
    </div>
  );
}