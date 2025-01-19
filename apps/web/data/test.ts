import { auth } from "@/lib/auth";
import { prisma, Test } from "@workspace/database";

export interface TestData extends Test {
  students: string[];
  chapters: string[];
  subjects: string[];
  questions: string[];
}

export const getTests = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const instituteId = await prisma.institute.findFirst({ where: { userId } });
  const result = await prisma.test.findMany({
    where: { instituteId: instituteId?.id },
    include: {
      Students: {
        select: {
          studentId: true,
        },
      },
      TestOnChapter: {
        select: {
          chapterId: true,
        },
      },
      TestOnQuestion: {
        select: {
          questionId: true,
        },
      },
      TestOnSubject: {
        select: {
          subjectId: true,
        },
      },
    },
  });
  const data: TestData[] = result.map((test) => {
    const students = test.Students.map((student) => student.studentId);
    const chapters = test.TestOnChapter.map((chapter) => chapter.chapterId);
    const subjects = test.TestOnSubject.map((subject) => subject.subjectId);
    const questions = test.TestOnQuestion.map(
      (question) => question.questionId,
    );
    return { ...test, students, chapters, subjects, questions };
  });
  return data;
};
