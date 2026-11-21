import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const destinations = [
    {
      title: "Intake POS",
      description: "Create and manage repair intake orders.",
      href: "/shop/intake",
    },
    {
      title: "Business Admin",
      description: "View shop operations and business settings.",
      href: "/shop",
    },
    {
      title: "Technician",
      description: "Open assigned repairs and update their status.",
      href: "/shop/technician",
    },
    {
      title: "Customer",
      description: "View repair progress and customer communication.",
      href: "/shop/customer",
    },
    {
      title: "Platform Admin",
      description: "Manage the platform and all business accounts.",
      href: "/platform",
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center p-6 sm:p-10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Repair Intake</CardTitle>
          <CardDescription>
            Choose a dashboard or workspace to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="col-span-full mb-1 flex justify-end gap-3">
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
              href="/login"
            >
              Sign in
            </Link>
            <Link
              className="text-sm font-medium text-primary hover:underline"
              href="/register"
            >
              Create account
            </Link>
          </div>
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="rounded-lg border border-border p-4 transition-colors hover:border-ring hover:bg-muted/50"
            >
              <span className="block font-medium text-card-foreground">
                {destination.title}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {destination.description}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
