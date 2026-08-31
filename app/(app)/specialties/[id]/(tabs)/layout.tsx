import SpecialtyTabs from "@/app/ui/specialty-tabs";

export default async function TabsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <SpecialtyTabs id={id} />
      <div className="mt-6">{children}</div>
    </div>
  );
}