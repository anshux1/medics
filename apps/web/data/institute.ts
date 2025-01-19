import { auth } from "@/lib/auth";
import { Institute, prisma } from "@workspace/database";

export const getInstitutes = async (): Promise<Institute[]> => {
  const session = await auth();
  const userId = session?.user.id;
  const result = await prisma.institute.findMany({ where: { userId } });
  return result;
};
