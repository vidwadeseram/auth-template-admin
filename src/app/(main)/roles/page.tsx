"use client";

import { useState } from "react";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
}

export default function RolesPage() {
  const { apiClient } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadRoles() {
    setLoading(true);
    try {
      const res = await apiClient.get("/admin/roles") as { data: Role[] };
      setRoles(res.data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load roles");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Roles</h1>
        <Button onClick={loadRoles} disabled={loading}>{loading ? "Loading..." : "Load Roles"}</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.length === 0 ? (
          <Card className="col-span-full"><CardContent className="p-8 text-center text-muted-foreground">No roles loaded. Click &quot;Load Roles&quot; to fetch.</CardContent></Card>
        ) : roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{role.name} <Badge variant="secondary">{role.permissions.length} perms</Badge></CardTitle>
              {role.description && <p className="text-sm text-muted-foreground">{role.description}</p>}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">{role.permissions.map((p) => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
