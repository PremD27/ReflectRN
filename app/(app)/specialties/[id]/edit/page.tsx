import { getSpecialty, updateSpecialty } from "@/app/specialty-actions";
import { notFound } from "next/navigation";


export default async function Page({ id }: { id: string }) {
  const updateSpecialtyWithId = updateSpecialty.bind(null, id);
  const specialty = await getSpecialty(id);

  if (!specialty) notFound();

  return (
    <div className="mx-auto max-w-xl px-10 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-sage-600">Specialty</p>
      <h1 className="mt-1 mb-8 font-serif text-3xl text-ink">Edit a Specialty</h1>

      <form
        action={updateSpecialtyWithId}
        className="rounded-lg border border-black/5 bg-white p-8"
      >
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-ink/70">Specialty name</label>
          <input
            type="text"
            name="specialty-name"
            defaultValue={specialty.name}
            className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm text-ink focus:border-sage-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sage-700"
        >
          Save Specialty
        </button>
      </form>
    </div>
  );
}