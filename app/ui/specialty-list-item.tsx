import Link from "next/link";
import type { Specialty } from "../generated/prisma";

type SpecialtyWithCounts = Specialty & {
  _count: { procedures: number; diagnoses: number };
};

export default function SpecialtyListItem({ specialty }: { specialty: SpecialtyWithCounts }) {
  return (
    <li>
      <Link
        href={`/specialties/${specialty.id}`}
        className="block rounded-lg border border-black/5 bg-white p-6 transition hover:border-sage-200 hover:shadow-sm"
      >
        <p className="font-serif text-xl text-ink">{specialty.name}</p>
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <span className="font-medium text-ink">{specialty._count.procedures}</span>
            <span className="text-ink/40"> procedures</span>
          </div>
          <div>
            <span className="font-medium text-ink">{specialty._count.diagnoses}</span>
            <span className="text-ink/40"> diagnoses</span>
          </div>
        </div>
      </Link>
    </li>
  );
}