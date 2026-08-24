import { getSpecialty } from "@/app/specialty-actions";
import { notFound } from "next/navigation";
import SpecialtyTabs from "@/app/ui/specialty-tabs";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const specialty = await getSpecialty(id);

  if (!specialty) notFound();

  return (
    <div className="mx-auto max-w-5xl px-10 py-10">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-sage-600">Specialty</p>
        <h1 className="mt-1 font-serif text-3xl text-ink">{specialty.name}</h1>
      </div>

      <SpecialtyTabs id={id} />

      <div className="mt-6">{children}</div>
    </div>
  );
}