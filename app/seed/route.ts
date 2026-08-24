import { db } from "../lib/db";
import { TEMP_USER } from "../lib/user";

export async function GET() {
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

    try {
        await db.user.upsert({
            where: { id: TEMP_USER.id },
            update: {},
            create: TEMP_USER
        });

        return Response.json({ message: 'User seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}