"use server";

import { auth } from "@/lib/auth";
import { createAction } from "@workspace/ui/lib/createAction";
import { prisma } from "@workspace/database";
import { updateRoleSchema } from "./schema";
import { InputTypeUpdateRole, RetrunTypeUpdateRole } from "./types";

const updateRoleHandler = async (
  input: InputTypeUpdateRole,
): Promise<RetrunTypeUpdateRole> => {
  const session = await auth();
  if (!session || !session.user.id) return { error: "Unauthorized" };
  const userId = session.user.id;
  try {
    const result = await prisma.user.update({
      where: { id: userId },
      data: {
        role: input.role,
        onBoardedOnTest: input.role === "STUDENT" ? true : false,
      },
      select: {
        role: true,
      },
    });
    return { data: result };
  } catch {
    return { error: "Failed to Update role." };
  }
};

export const updateRole = createAction(updateRoleSchema, updateRoleHandler);
