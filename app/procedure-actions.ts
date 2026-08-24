'use server';

import { db } from "./lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { requireUserId } from "./lib/auth";
import { getSpecialty } from "./specialty-actions";


// Create a procedure for a user
export async function createProcedure(specialtyId: string, from: string | undefined, formData: FormData) {
    const name = formData.get('procedure-name') as string;
    const notes = (formData.get('procedure-notes') as string) ?? '';
    const comfort = Number(formData.get('procedure-comfort')) as number;
    const enjoyment = Number(formData.get('procedure-enjoyment')) as number;
    const emotion = (formData.get('procedure-emotion') as string) ?? 'confident';
    const performedAt = new Date(formData.get('procedure-performedAt') as string);

    // Get userId
    const USER_ID = await requireUserId();

    // Ownership check
    if (! await getSpecialty(specialtyId)) notFound();
    
    await db.procedure.create({
        data: {
            name,
            notes,
            comfort,
            enjoyment,
            emotion,
            performedAt,
            userId: USER_ID,
            specialtyId,
        }
    });

    revalidatePath(`/specialties/${specialtyId}`);
    revalidatePath('/procedures');
    redirect(from ?? `/specialties/${specialtyId}`);
    //redirect(`/specialties/${specialtyId}`);
}

// Get all procedures related belonging to the user
export async function getProcedures() {

    // Get userId
    const USER_ID = await requireUserId();

    const procedures = await db.procedure.findMany({
        where: {userId: USER_ID},
        orderBy: {performedAt: "desc"},
    });

    return procedures;
}

export async function getProceduresBySpecialty(specialtyId: string){ 

    // Get userId
    const USER_ID = await requireUserId();

    const procedures = await db.procedure.findMany({
        where: {
            userId: USER_ID,
            specialtyId,
        },
        orderBy: {performedAt: "desc"},
    });

    return procedures;
}

// Get a specific procedure with its id (for dynamic routes, etc.)
export async function getProcedure(id: string) {

    // Get userId
    const USER_ID = await requireUserId();

    const procedure = await db.procedure.findFirst({
        where: {
            id,
            userId: USER_ID,
        }
    });

    return procedure;
}

// Delete a procedure based off its ID
export async function deleteProcedure(id: string): Promise<void>{
    
    // Get userId
    const USER_ID = await requireUserId();

    const result = await db.procedure.deleteMany({
        where: {
            id,
            userId: USER_ID,
        }
    });

    if (result.count > 0) {
        revalidatePath('/procedures');
        redirect('/procedures');
    }
}

// Update a procedure
export async function updateProcedure(id: string, formData: FormData) {
    const name = formData.get('procedure-name') as string;
    const notes = (formData.get('procedure-notes') as string) ?? '';
    const comfort = Number(formData.get('procedure-comfort')) as number;
    const enjoyment = Number(formData.get('procedure-enjoyment')) as number;
    const emotion = formData.get('procedure-emotion') as string;
    const performedAt = new Date(formData.get('procedure-performedAt') as string);

    // Get userId
    const USER_ID = await requireUserId();

    await db.procedure.updateMany({
        where: {
            id,
            userId: USER_ID,
        },
        data: {
            name,
            notes,
            comfort,
            enjoyment,
            emotion,
            performedAt,
        }
    });

    revalidatePath('/procedures');
    revalidatePath(`/procedures/${id}`);
    redirect(`/procedures/${id}`);
}