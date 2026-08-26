"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, ClipboardList, LibraryBig, LayoutDashboard, User } from "lucide-react";

interface SidebarProps {
  userName: string;
  userEmail: string;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/specialties", label: "Specialties", icon: Stethoscope },
  { href: "/procedures", label: "Procedures", icon: ClipboardList },
  { href: "/diagnoses", label: "Diagnoses", icon: LibraryBig},
];

export default function Sidebar({ userName, userEmail }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-black/5 bg-white">
      <div className="border-b border-black/5 px-6 py-6">
        <h1 className="font-serif text-xl text-ink">ReflectRN</h1>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-sage-100 text-sage-800"
                      : "text-ink/60 hover:bg-black/5 hover:text-ink"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3 border-t border-black/5 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-sage-700">
          <User size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{userName}</p>
          <p className="text-xs text-ink/50">Nurse</p>
        </div>
      </div>
    </aside>
  );
}