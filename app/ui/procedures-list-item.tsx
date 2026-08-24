import Link from "next/link";
import type { Procedure } from "../generated/prisma";

const emotionStyles: Record<string, string> = {
  confident: "bg-sage-100 text-sage-700",
  happy: "bg-sky-100 text-sky-700",
  anxious: "bg-amber-100 text-amber-700",
  overwhelmed: "bg-rose-100 text-rose-700",
};

export default function ProcedureListItem({
  procedure,
  from,
}: {
  procedure: Procedure;
  from?: string;
}) {
  const href = from
    ? `/procedures/${procedure.id}?from=${from}`
    : `/procedures/${procedure.id}`;

  return (
    <li>
      <Link
        href={href}
        className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-6 px-5 py-3 text-sm transition hover:bg-black/[0.02]"
      >
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{procedure.name}</p>
          <p className="text-xs text-ink/40">
            {procedure.performedAt.toLocaleDateString("en-CA", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="w-20 text-right">
          <p className="text-xs text-ink/40">Comfort</p>
          <p className="font-medium text-ink">{procedure.comfort}/5</p>
        </div>

        <div className="w-20 text-right">
          <p className="text-xs text-ink/40">Enjoyment</p>
          <p className="font-medium text-ink">{procedure.enjoyment}/5</p>
        </div>

        <span
          className={`justify-self-start whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium capitalize ${
            emotionStyles[procedure.emotion] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {procedure.emotion}
        </span>

        <span className="text-ink/20">→</span>
      </Link>
    </li>
  );
}