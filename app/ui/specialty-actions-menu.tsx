import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { deleteSpecialty } from "../specialty-actions";

export default async function SpecialtyActionsMenu({ specialtyId } : { specialtyId: string }) {
    const deleteWithId = deleteSpecialty.bind(null, specialtyId);

     return (
        <div className="group relative">
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-ink/40 transition hover:bg-black/5 hover:text-ink">
                <MoreVertical size={18} />
            </button>

            <div className="invisible absolute right-0 top-full z-10 mt-1 w-36 origin-top-right scale-95 rounded-lg border border-black/5 bg-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                <Link
                    href={`/specialties/${specialtyId}/edit`}
                    className="block px-4 py-2.5 text-sm text-ink transition hover:bg-black/5"
                >
                Edit
                </Link>
                <form action={deleteWithId}>
                    <button
                        type="submit"
                        className="block w-full px-4 py-2.5 text-left text-sm text-rose-700 transition hover:bg-rose-50"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
  );
}