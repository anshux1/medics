"use server";

import { difficultyProportions, Proportions } from "@/config/constants";
import { auth } from "@/lib/auth";
import { createAction } from "@workspace/ui/lib/createAction";
import { prisma } from "@workspace/database";
import { createTestSchema } from "./schema";
import { InputTypeCreateTest, ReturnTypeCreateTest } from "./types";

interface Question {
  id: string;
  level: number;
}

const getSelectedQuestion = (
  questions: Question[],
  input: InputTypeCreateTest,
  proportions: Proportions,
) => {
  const selectedQuestions: Question[] = [];

  const easyQuestions = questions.filter((q) => q.level === 1);
  const mediumQuestions = questions.filter((q) => q.level === 2);
  const hardQuestions = questions.filter((q) => q.level === 3);

  const counts = {
    easy: Math.floor((input.noOfQuestions * proportions.easy) / 100),
    medium: Math.floor((input.noOfQuestions * proportions.medium) / 100),
    hard: Math.floor((input.noOfQuestions * proportions.hard) / 100),
  };

  const selectRandom = (ques: Question[], count: number) => {
    const shuffled = ques.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  selectedQuestions.push(
    ...selectRandom(easyQuestions, counts.easy),
    ...selectRandom(mediumQuestions, counts.medium),
    ...selectRandom(hardQuestions, counts.hard),
  );
  return selectedQuestions;
};

const createTestHandler = async (
  input: InputTypeCreateTest,
): Promise<ReturnTypeCreateTest> => {
  const session = await auth();
  if (!session || !session.user.id) return { error: "Unauthorized" };
  const userId = session.user.id;
  let instituteId = input.instituteId;
  if (!instituteId) {
    const institute = await prisma.institute.findFirst({ where: { userId } });
    if (!institute)
      return { error: "Please create a institute before creating test!" };
    instituteId = institute.id;
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      const test = await tx.test.create({
        data: {
          name: input.name,
          instituteId: instituteId,
          difficulty: input.difficulty,
          noOfQuestions: input.noOfQuestions,
          timeLimit: input.timeLimit,
          expires_at: new Date(),
        },
      });
      await tx.testOnChapter.createMany({
        data: input.chatpers.map((chap) => ({
          testId: test.id,
          chapterId: chap,
        })),
      });
      await tx.testOnSubject.createMany({
        data: input.subjects.map((sub) => ({
          testId: test.id,
          subjectId: sub,
        })),
      });
      const questions = await tx.question.findMany({
        where: {
          chapterId: {
            in: input.chatpers,
          },
        },
        select: {
          id: true,
          level: true,
        },
      });
      if (!questions || questions.length === 0) {
        return { error: "No questions found for the selected chapters" };
      }
      const proportions = difficultyProportions[input.difficulty];
      if (!proportions) return { error: "Invalid difficulty level" };
      const selectedQuestions = getSelectedQuestion(
        questions,
        input,
        proportions,
      );

      await tx.testOnQuestion.createMany({
        data: selectedQuestions.map((ques) => ({
          testId: test.id,
          questionId: ques.id,
        })),
      });
      return { data: test };
    });
    return result;
  } catch {
    return { error: "Failed to create institute" };
  }
};

export const createTest = createAction(createTestSchema, createTestHandler);
