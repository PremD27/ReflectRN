import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import Sidebar from '../ui/sidebar';

export default async function AppLayout({ children }: {children: React.ReactNode}){
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    return (
        <div className="flex h-screen overflow-hidden bg-cream">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
