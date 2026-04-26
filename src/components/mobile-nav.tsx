"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/roles", label: "Roles" },
  { href: "/tenants", label: "Tenants" },
];

export function MobileNav({ isMultiTenant }: { isMultiTenant?: boolean }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const visibleLinks = isMultiTenant ? links : links.filter((l) => l.href !== "/tenants");

  return (
    <div className="md:hidden flex items-center justify-between border-b px-4 py-3 bg-card">
      <h1 className="text-lg font-bold">Admin Panel</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            {user && <p className="text-sm text-muted-foreground truncate">{user.email}</p>}
          </div>
          <nav className="p-4 space-y-1">
            {visibleLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={cn("block px-3 py-2 rounded-md text-sm transition-colors",
                  pathname.startsWith(link.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => { logout(); setOpen(false); }}>Sign out</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
