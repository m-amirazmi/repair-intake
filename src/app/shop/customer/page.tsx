import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Customer Dashboard</CardTitle>
          <CardDescription>Repair tracking workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Customers will view repair progress and quotations here.
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
