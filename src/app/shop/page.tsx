import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShopPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Business Admin Dashboard</CardTitle>
          <CardDescription>Shop management workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Business administration features will be available here.
          </p>
          <div className="mt-4 flex items-center gap-3">
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
