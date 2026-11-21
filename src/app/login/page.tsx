"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Email or password is incorrect.");
        return;
      }

      router.replace("/shop/onboarding");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function signInWithGoogle() {
    setError("");
    setPending(true);

    try {
      const { data, error: authError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/shop/onboarding`,
      });

      if (authError) {
        setError(authError.message || "Unable to continue with Google.");
        setPending(false);
        return;
      }

      if (data?.url) {
        window.location.assign(data.url);
      } else {
        setError("Google sign-in did not return a login URL.");
        setPending(false);
      }
    } catch {
      setError("Unable to continue with Google. Please try again.");
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4 sm:p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your shop</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signInWithEmail}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  disabled={pending}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={pending}
                />
              </Field>
              {error && <FieldError>{error}</FieldError>}
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? "Signing in..." : "Sign in"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={pending}
                  onClick={signInWithGoogle}
                >
                  Continue with Google
                </Button>
              </Field>
              <p className="text-center text-sm text-muted-foreground">
                New to Repair Intake?{" "}
                <Link
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  href="/register"
                >
                  Create an account
                </Link>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
