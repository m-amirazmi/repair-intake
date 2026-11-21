import Link from "next/link";
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
          <Link
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            href="/"
          >
            Back to homepage
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
