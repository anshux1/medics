"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { createAction } from "@workspace/ui/lib/createAction";
import { prisma } from "@workspace/database";
import { createInstituteSchema, deleteInstituteSchema } from "./schema";
import {
  InputTypeCreateInstitute,
  InputTypeDeleteInstitute,
  ReturnTypeCreateInstitute,
  ReturnTypeDeleteInstitute,
} from "./types";

const createInstituteHandler = async (
  input: InputTypeCreateInstitute,
): Promise<ReturnTypeCreateInstitute> => {
  const session = await auth();
  if (!session || !session.user.id) return { error: "Unauthorized" };
  const userId = session.user.id;
  try {
    const result = await prisma.institute.create({
      data: {
        userId,
        ...input,
      },
      select: {
        id: true,
      },
    });
    return { data: result };
  } catch {
    return { error: "Failed to create institute" };
  }
};

const deleteInstituteHandler = async (
  input: InputTypeDeleteInstitute,
): Promise<ReturnTypeDeleteInstitute> => {
  const session = await auth();
  if (!session || !session.user.id) return { error: "Unauthorized" };
  try {
    const result = await prisma.institute.delete({
      where: { id: input.id },
      select: {
        id: true,
        name: true,
      },
    });
    revalidatePath("/dashboard/manage-institutes");
    return { data: result };
  } catch {
    return { error: "Failed to create institute" };
  }
};

export const createInstitute = createAction(
  createInstituteSchema,
  createInstituteHandler,
);

export const deleteInstitute = createAction(
  deleteInstituteSchema,
  deleteInstituteHandler,
);
