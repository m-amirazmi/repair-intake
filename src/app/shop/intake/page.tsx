import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { createTodo, toggleTodo } from "./actions";

export const dynamic = "force-dynamic";

export default async function IntakePage() {
  const items = await getDb()
    .select()
    .from(todos)
    .orderBy(desc(todos.createdAt), desc(todos.id));

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Intake test todos</CardTitle>
          <CardDescription>
            Add tasks and mark them complete to test the Neon database
            connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTodo} className="mb-6 flex gap-2">
            <Input
              aria-label="Todo title"
              maxLength={200}
              name="title"
              placeholder="Add a todo"
              required
            />
            <Button type="submit">Add</Button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="px-3 py-2 font-medium" scope="col">
                    Todo
                  </th>
                  <th className="px-3 py-2 font-medium" scope="col">
                    Status
                  </th>
                  <th className="px-3 py-2 text-right font-medium" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((todo) => (
                  <tr className="border-b last:border-0" key={todo.id}>
                    <td
                      className={`px-3 py-3 ${
                        todo.completed
                          ? "text-muted-foreground line-through"
                          : ""
                      }`}
                    >
                      {todo.title}
                    </td>
                    <td className="px-3 py-3">
                      {todo.completed ? "Done" : "Open"}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <form
                        action={toggleTodo.bind(null, todo.id, !todo.completed)}
                      >
                        <Button type="submit" variant="outline">
                          {todo.completed ? "Reopen" : "Complete"}
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      className="px-3 py-6 text-center text-muted-foreground"
                      colSpan={3}
                    >
                      No todos yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Link
            className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
            href="/"
          >
            Back to homepage
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
