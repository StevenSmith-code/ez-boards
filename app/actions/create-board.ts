"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const createBoard = z.object({
  title: z.string().min(3, {
    message: "minimum length of 3 letters is required",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = createBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      messsage: "Missing fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Database Error",
    };
  }

  revalidatePath("/organization/org_2YKDvZ5KCAnDSk73YBJsRAvnS6P");
  redirect("/organization/org_2YKDvZ5KCAnDSk73YBJsRAvnS6P");
}