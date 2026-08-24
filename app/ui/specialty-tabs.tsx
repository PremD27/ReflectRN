"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SpecialtyTabs({ id }: { id: string }) {
  const pathname = usePathname();

  const tabs = [
    { label: "Procedures", href: `/specialties/${id}` },
    { label: "Diagnoses", href: `/specialties/${id}/diagnoses` },
  ];

  return (
    <div className="flex gap-1 border-b border-black/10">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "border-sage-600 text-sage-700"
                : "border-transparent text-ink/50 hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}