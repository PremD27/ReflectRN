import { createSpecialty } from "@/app/specialty-actions";


export default function Page() {
    return (
        <div>
            <h1>Add a specialty</h1>

            <form action={createSpecialty}>
                <div>
                    <label>Specialty name</label>
                    <input 
                        type="text"
                        name="specialty-name"
                        placeholder="e.g. Emergency Medicine"
                    />
                </div>

                <button
                    type="submit"
                >
                    Save Specialty 
                </button>
            </form>
        </div>

    );
}