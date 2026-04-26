"use client";

import { use } from "react";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user: currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Details</h1>
      <Card>
        <CardHeader><CardTitle>User Information</CardTitle><CardDescription>User ID: {id}</CardDescription></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Connect your backend to load user details. The API client is available via useAuth() hook.</p>
        </CardContent>
      </Card>
    </div>
  );
}
