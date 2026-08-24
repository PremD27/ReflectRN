import { db } from "./lib/db";
import { requireUserId } from "./lib/auth";


export async function getDashboardStats() {

    // Get userId
    const USER_ID = await requireUserId();

    // Count of total procedures and diagnoses
    const totalProcedures = await db.procedure.count({ where: { userId: USER_ID } });
    const totalDiagnoses = await db.diagnosis.count({ where: { userId: USER_ID } });

    // Average comfort and enjoyment
    const average = await db.procedure.aggregate({
        where: { userId: USER_ID },
        _avg: { comfort: true, enjoyment: true }
    });
    
    return { 
        totalProcedures,
        totalDiagnoses,
        avgComfort: parseFloat((average._avg.comfort ?? 0).toFixed(1)),
        avgEnjoyment: parseFloat((average._avg.enjoyment ?? 0).toFixed(1)), 
    };
}

export async function getRecentProcedures() {

    // Get userId
    const USER_ID = await requireUserId();

    return db.procedure.findMany({
        where: { userId: USER_ID },
        orderBy: { performedAt: 'desc' },
        take: 5,
    });
}

export async function getRecentDiagnoses() {

    // Get userId
    const USER_ID = await requireUserId();

    return db.diagnosis.findMany({
        where: { userId: USER_ID },
        orderBy: { diagnosedAt: 'desc' },
        take: 5,
    });
}

export async function getProceduresOverTime() {

    // Get userId
    const USER_ID = await requireUserId();

    const procedures = await db.procedure.findMany({
        where: { userId: USER_ID},
        select: { performedAt: true },
        orderBy: { performedAt: 'asc' },
    });

    // Group by month
    const grouped = procedures.reduce((acc, p) => {
        const month = p.performedAt.toLocaleDateString('en-CA', {
            month: 'short',
            year: 'numeric',
        });

        acc[month] = (acc[month] ?? 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([month, count]) => ({month, count}));
}

export async function getComfortOverTime() {

    // Get userId
    const USER_ID = await requireUserId();

    const procedures = await db.procedure.findMany({
        where: { userId: USER_ID },
        select: { performedAt: true, comfort: true },
        orderBy: { performedAt: 'asc' },
    });

    const grouped = procedures.reduce((acc, p) => {
        const month = p.performedAt.toLocaleDateString('en-CA', {
            month: 'short',
            year: 'numeric'
        });

        if (!acc[month]) {
            acc[month] = {sum: 0, count: 0};
        }

        acc[month].sum += p.comfort;
        acc[month].count += 1;

        return acc;
    }, {} as Record<string, {sum: number, count: number}>);

    return Object.entries(grouped).map(([month, { sum, count }]) => ({
        month,
        avgComfort: parseFloat((sum / count).toFixed(1)),
    }));
}

export async function getEmotionBreakdown() {

    // Get userId
    const USER_ID = await requireUserId();
    
    const raw = await db.procedure.groupBy({
        by: ['emotion'],
        where: { userId: USER_ID },
        _count: { emotion: true },
    });

    return raw.map((item) => ({
        emotion: item.emotion,
        count: item._count.emotion,
    }));
}