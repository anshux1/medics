import { auth } from "@/lib/auth";
import { Institute, prisma } from "@workspace/database";
import { ReturnTypeError } from "./types";

export const getInstitutes = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const result = await prisma.institute.findMany({ where: { userId } });
  return result;
};
