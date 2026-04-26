"use client";

import { use, useState } from "react";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
}

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { apiClient } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadUser() {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/admin/users/${id}`) as { data: UserData };
      setUser(res.data);
    } catch (err: unknown) {
      toast.error((err instanceof Error ? err.message : null) || "Failed to load user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Details</h1>
        <Button onClick={loadUser} disabled={loading}>{loading ? "Loading..." : "Load Details"}</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>User Information</CardTitle><CardDescription>User ID: {id}</CardDescription></CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{user.email}</p></div>
                <div><p className="text-sm text-muted-foreground">Name</p><p className="font-medium">{user.first_name} {user.last_name}</p></div>
                <div><p className="text-sm text-muted-foreground">Role</p><Badge variant="secondary">{user.role}</Badge></div>
                <div><p className="text-sm text-muted-foreground">Status</p><Badge variant={user.is_active ? "default" : "destructive"}>{user.is_active ? "Active" : "Inactive"}</Badge></div>
                <div><p className="text-sm text-muted-foreground">Verified</p><Badge variant={user.email_verified ? "default" : "outline"}>{user.email_verified ? "Verified" : "Unverified"}</Badge></div>
                <div><p className="text-sm text-muted-foreground">Created</p><p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p></div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Click &quot;Load Details&quot; to fetch user information.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
