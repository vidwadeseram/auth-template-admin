"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMultiTenant, setIsMultiTenant] = useState(false);

  useEffect(() => {
    // Auto-detect multi-tenant by checking OpenAPI spec for tenant endpoints
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";
    fetch(`${baseUrl}/openapi.json`)
      .then((r) => r.json())
      .then((spec) => {
        const hasTenants = Object.keys(spec.paths || {}).some((p) => p.includes("/tenants"));
        setIsMultiTenant(hasTenants);
      })
      .catch(() => setIsMultiTenant(false));
  }, []);

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar isMultiTenant={isMultiTenant} />
        <div className="flex-1 flex flex-col">
          <MobileNav isMultiTenant={isMultiTenant} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
