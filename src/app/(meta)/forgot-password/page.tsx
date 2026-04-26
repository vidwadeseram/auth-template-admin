"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@vidwadeseram/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await forgotPassword(email); setSent(true); toast.success("Reset link sent if account exists"); }
    catch (err: any) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center"><CardTitle className="text-2xl">Reset password</CardTitle><CardDescription>Enter your email</CardDescription></CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-4"><p className="text-muted-foreground">Check your email.</p><Link href="/login"><Button variant="outline">Back to login</Button></Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send reset link"}</Button>
              <p className="text-center text-sm"><Link href="/login" className="text-muted-foreground hover:text-foreground">Back to login</Link></p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
