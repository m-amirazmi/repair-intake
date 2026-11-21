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

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function registerWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (name.length < 2) {
      setError("Enter your full name.");
      setPending(false);
      return;
    }

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      setPending(false);
      return;
    }

    try {
      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Unable to create this account.");
        return;
      }

      router.replace("/shop/onboarding");
      router.refresh();
    } catch {
      setError("Unable to create this account. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function signUpWithGoogle() {
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
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Start a 14-day trial for one repair shop outlet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerWithEmail}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Rahman"
                  required
                  disabled={pending}
                />
              </Field>
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
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={pending}
                />
                <p className="text-xs text-muted-foreground">
                  Use at least 8 characters.
                </p>
              </Field>
              {error && <FieldError>{error}</FieldError>}
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? "Creating account..." : "Create account"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={pending}
                  onClick={signUpWithGoogle}
                >
                  Continue with Google
                </Button>
              </Field>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  href="/login"
                >
                  Sign in
                </Link>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
