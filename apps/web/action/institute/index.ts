'use server';

import { auth } from "@/lib/auth";
import { createInstituteSchema } from "./schema";
import { InputTypeCreateInstitute, ReturnTypeCreateInstitute } from "./types";
import { prisma } from "@workspace/database";
import { createAction } from "@workspace/ui/lib/createAction";

const createInstituteHandler = async (input: InputTypeCreateInstitute): Promise<ReturnTypeCreateInstitute> => {
  const session = await auth()
  if (!session || !session.user.id) return { error: "Unauthorized" }
  const userId = session.user.id
  try {
    const result = await prisma.institute.create({
      data: {
        userId,
        ...input,
      },
      select: {
        id: true
      }
    })
    return { data: result }
  } catch {
    return { error: "Failed to create institute" }
  }
}

export const createInstitute = createAction(createInstituteSchema, createInstituteHandler);
