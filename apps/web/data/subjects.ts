import { prisma } from "@workspace/database";

export const getSubjects = async () => {
  const result = await prisma.subject.findMany({
    select: {
      id: true,
      subjectName: true,
    },
  });
  return result;
};

export const getUnits = async () => {
  const result = await prisma.unit.findMany({
    select: {
      id: true,
      totalChapters: true,
      unitName: true,
      subjectId: true,
      chapters: {
        select: {
          id: true,
          chapterName: true,
        },
      },
    },
  });
  return result;
};
