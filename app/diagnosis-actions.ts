'use server';

import { db } from "./lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { requireUserId } from "./lib/auth";
import { getSpecialty } from "./specialty-actions";


// Create a diagnoses for a user
export async function createDiagnosis(specialtyId: string, from: string | undefined, formData: FormData) {
    const name = formData.get('diagnosis-name') as string;
    const notes = (formData.get('diagnosis-notes') as string) ?? '';
    const diagnosedAt = new Date(formData.get('diagnosis-at') as string);
    
    // Get userId
    const USER_ID = await requireUserId();

    if (!await getSpecialty(specialtyId)) notFound();

    await db.diagnosis.create({
        data: {
            name,
            notes,
            diagnosedAt,
            userId: USER_ID,
            specialtyId,
        }
    });

    //revalidatePath('/diagnoses');
    revalidatePath(`/specialties/${specialtyId}`)
    redirect(from ?? `/specialties/${specialtyId}`);
}

// Get all diagnoses related belonging to the user
export async function getDiagnoses(){ 

    // Get userId
    const USER_ID = await requireUserId();

    const diagnoses = await db.diagnosis.findMany({
        where: {userId: USER_ID},
    });

    return diagnoses;
}

export async function getDiagnosesBySpecialty(specialtyId: string){ 

    // Get userId
    const USER_ID = await requireUserId();

    const diagnoses = await db.diagnosis.findMany({
        where: {
            userId: USER_ID,
            specialtyId,
        },
    });

    return diagnoses;
}

// Get a specific diagnosis with its id (for dynamic routes, etc.)
export async function getDiagnosis(id: string) {

    // Get userId
    const USER_ID = await requireUserId();

    const diagnosis = await db.diagnosis.findFirst({
        where: {
            id,
            userId: USER_ID,
        }
    });

    return diagnosis;
}

// Delete a diagnosis based off its ID
export async function deleteDiagnosis(specialtyId: string, id: string, from: string | undefined): Promise<void>{
    
    // Get userId
    const USER_ID = await requireUserId();

    const result = await db.diagnosis.deleteMany({
        where: {
            id,
            userId: USER_ID,
        }
    });

    if (result.count > 0) {
        const backlink = from ?? '/diagnoses'

        revalidatePath(`/specialties/${specialtyId}`);
        revalidatePath('/diagnoses');
        redirect(backlink);
    }
}

// Update a diagnosis
export async function updateDiagnosis(specialtyId: string, id: string, from: string | undefined, formData: FormData) {
    const name = formData.get('diagnosis-name') as string;
    const notes = (formData.get('diagnosis-notes') as string) ?? '';
    const diagnosedAt = new Date(formData.get('diagnosis-at') as string);

    const backlink = from ? `/diagnoses/${id}?from=${from}` : `/diagnoses/${id}`;

    // Get userId
    const USER_ID = await requireUserId();

    await db.diagnosis.updateMany({
        where: {
            id,
            userId: USER_ID,
        },
        data: {
            name,
            notes,
            diagnosedAt,
        }
    });

    //revalidatePath('/diagnoses');
    //revalidatePath(`/diagnoses/${id}`);
    //redirect('/diagnoses');
    revalidatePath('/diagnoses');
    revalidatePath(`/specialties/${specialtyId}`);
    revalidatePath(`/diagnoses/${id}`);
    redirect(backlink);
}