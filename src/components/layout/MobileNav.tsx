"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Send, CreditCard, Bell, Settings } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/send", label: "Send", icon: Send },
    { href: "/dashboard/cards", label: "Cards", icon: CreditCard },
    { href: "/dashboard/notifications", label: "Alerts", icon: Bell },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 z-50">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition ${
                active
                  ? "text-blue-500"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
