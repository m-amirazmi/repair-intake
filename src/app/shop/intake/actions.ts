"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { todos } from "@/db/schema";

export async function createTodo(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("Todo title is required.");
  }

  if (title.length > 200) {
    throw new Error("Todo title must be 200 characters or fewer.");
  }

  await getDb().insert(todos).values({ title: title.trim() });
  revalidatePath("/shop/intake");
}

export async function toggleTodo(
  id: number,
  completed: boolean,
  _formData: FormData,
) {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("A valid todo ID is required.");
  }

  const updated = await getDb()
    .update(todos)
    .set({ completed })
    .where(eq(todos.id, id))
    .returning({ id: todos.id });

  if (updated.length === 0) {
    throw new Error(`Todo ${id} was not found.`);
  }

  revalidatePath("/shop/intake");
}
