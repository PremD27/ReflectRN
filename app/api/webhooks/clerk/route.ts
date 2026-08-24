import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest) {

    try {
        const evt = await verifyWebhook(req);
        const eventType = evt.type;

        if (eventType === 'user.created') {
            // Create a new user row in the database
            const { id, email_addresses, first_name,  } = evt.data;

            // Extract the primary email
            const primaryEmail = email_addresses[0].email_address;

            await db.user.upsert({
                where: { id },
                update: {},
                create: {
                    id,
                    name: first_name || ' ',
                    email: primaryEmail,
                    role: 'nurse',
                }
            });

            return new Response('User synced successfully', { status: 200 })
        }

    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}