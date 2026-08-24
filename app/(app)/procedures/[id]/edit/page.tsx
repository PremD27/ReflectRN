import { getProcedure, updateProcedure } from "@/app/procedure-actions";
import { notFound } from "next/navigation";
import ComfortSlider from "@/app/ui/comfort-slider";
import EnjoymentSlider from "@/app/ui/enjoyment-slider";
import EmotionSelector from "@/app/ui/emotion-selector";

export default async function Page( { params }: { params: Promise<{ id: string }> } ) {
    const { id } = await params;
    const procedure = await getProcedure(id);
    
    if (!procedure) notFound();

    const updateWithId = updateProcedure.bind(null, id);



    return (
            //
            <div className="mx-auto max-w-2xl px-6 py-10">
              <h1 className="mb-8 border-b border-black/10 pb-4 font-serif text-3xl text-ink">
                Log a Procedure
              </h1>
        
              <form action={updateWithId} className="flex flex-col gap-6 rounded-xl border border-black/5 bg-white p-8 shadow-sm">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink/70">Procedure name</label>
                  <input
                    type="text"
                    name="procedure-name"
                    placeholder="e.g. IV Insertion"
                    className="w-full rounded-lg border border-black/10 px-4 py-2 text-ink focus:border-sage-600 focus:outline-none"
                    defaultValue={procedure.name}
                  />
                </div>
        
                <ComfortSlider defaultValue={procedure.comfort}/>
                <EnjoymentSlider defaultValue={procedure.enjoyment}/>
                <EmotionSelector defaultValue={procedure.emotion}/>
        
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink/70">Notes</label>
                  <textarea
                    name="procedure-notes"
                    rows={4}
                    className="w-full rounded-lg border border-black/10 px-4 py-2 text-ink focus:border-sage-600 focus:outline-none"
                    defaultValue={procedure.notes ?? ''}
                  />
                </div>
        
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink/70">Date performed</label>
                  <input
                    type="date"
                    name="procedure-performedAt"
                    defaultValue={(procedure.performedAt).toISOString().split('T')[0]}
                    className="rounded-lg border border-black/10 px-4 py-2 text-ink focus:border-sage-600 focus:outline-none"
                  />
                </div>
        
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sage-700"
                >
                  Save Procedure
                </button>
              </form>
            </div>
        );
}