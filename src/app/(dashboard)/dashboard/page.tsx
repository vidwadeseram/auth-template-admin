"use client";

import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your application</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Users</CardTitle><CardDescription>Total registered users</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">—</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Roles</CardTitle><CardDescription>Configured roles</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">—</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Admin</CardTitle><CardDescription>Your role</CardDescription></CardHeader>
          <CardContent><p className="text-2xl font-bold">{user?.role || "admin"}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
