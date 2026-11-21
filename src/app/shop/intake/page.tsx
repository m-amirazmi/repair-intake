import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IntakePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Intake POS</CardTitle>
          <CardDescription>Repair intake workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a placeholder for the repair intake and order entry
            workflow.
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
