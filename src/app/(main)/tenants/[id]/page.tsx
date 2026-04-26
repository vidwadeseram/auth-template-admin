"use client";

import { use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tenant Details</h1>
      <Card>
        <CardHeader><CardTitle>Tenant Information</CardTitle><CardDescription>Tenant ID: {id}</CardDescription></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Connect your multi-tenant backend to load tenant details. The API client is available via useAuth() hook.</p>
        </CardContent>
      </Card>
    </div>
  );
}
