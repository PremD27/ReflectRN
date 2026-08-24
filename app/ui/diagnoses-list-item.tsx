import Link from "next/link";
import type { Diagnosis } from "../generated/prisma";

export default function DiagnosesListItem({ diagnosis, from }: { diagnosis: Diagnosis, from?: string }) {
  const href = from
    ? `/diagnoses/${diagnosis.id}?from=${from}`
    : `/diagnoses/${diagnosis.id}`;

  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between gap-6 px-5 py-3 text-sm transition hover:bg-black/[0.02]"
      >
        <p className="font-medium text-ink">{diagnosis.name}</p>
        <p className="text-xs text-ink/40">
          {diagnosis.diagnosedAt.toLocaleDateString("en-CA", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <span className="text-ink/20">→</span>
      </Link>
    </li>
  );
}