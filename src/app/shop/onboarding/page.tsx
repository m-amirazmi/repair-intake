import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShopOnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Set up your first outlet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your account is ready. The first-outlet setup form and trial
            activation will be implemented in the next step.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className="text-sm font-medium text-primary hover:underline"
              href="/"
            >
              Back to homepage
            </Link>
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
