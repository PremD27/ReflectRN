'use server';

import { db } from "./lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUserId } from "./lib/auth";


// Create a specialty for a user
export async function createSpecialty(formData: FormData) {
    const name = formData.get('specialty-name') as string;

    // Get userId
    const USER_ID = await requireUserId();
    
    await db.specialty.create({
        data: {
            name,
            userId: USER_ID
        }
    });

    revalidatePath('/specialties');
    redirect('/specialties');
}

// Get all specialties related belonging to the user
export async function getSpecialties(){ 

    // Get userId
    const USER_ID = await requireUserId();

    const specialties = await db.specialty.findMany({
        where: {userId: USER_ID},
        include: {
            _count: {
                select: { procedures: true, diagnoses: true }
            },
        }
    });

    return specialties;
}

// Get a specific specialty with its id (for dynamic routes, etc.)
export async function getSpecialty(id: string) {

    // Get userId
    const USER_ID = await requireUserId();

    const specialty = await db.specialty.findFirst({
        where: {
            id,
            userId: USER_ID,
        }
    });

    return specialty;
}

// Delete a specialty based off its ID
export async function deleteSpecialty(id: string): Promise<void>{ 

    // Get userId
    const USER_ID = await requireUserId();

    const result = await db.specialty.deleteMany({
        where: {
            id,
            userId: USER_ID,
        }
    });

    if (result.count > 0) {
        revalidatePath('/specialties');
        redirect('/specialties');
    }
}

// Update a specialty
export async function updateSpecialty(id: string, formData: FormData) {
    const name = formData.get('specialty-name') as string;
    
    // Get userId
    const USER_ID = await requireUserId();

    await db.specialty.updateMany({
        where: {
            id,
            userId: USER_ID,
        },
        data: {
            name,
        }
    });

    revalidatePath('/specialties');
    revalidatePath(`/specialties/${id}`);
    redirect('/specialties');
}