import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import Sidebar from '../ui/sidebar';

export default async function AppLayout({ children }: {children: React.ReactNode}){
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId) redirect("/sign-in");

    return (
        <div className="flex h-screen overflow-hidden bg-cream">
            <Sidebar 
                userName={user?.firstName ?? 'User'}
                userEmail={user?.emailAddresses[0]?.emailAddress ?? ''}
            />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
