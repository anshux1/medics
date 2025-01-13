import { prisma } from "@workspace/database";
import { Biology, Class } from "@workspace/database/bio";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const seedClass = async () => {
  try {
    for (const clas of Class) {
      const result = await prisma.class.create({
        data: {
          className: clas.name,
        },
      });
      console.log("Class seeded successfully.", result);
    }
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

(async () => {
  try {
    const subject = await prisma.subject.create({
      data: {
        subjectName: Biology.title,
        isSyllabusFilterAvailable: Biology.isSyllabusFilterAvailable,
        isImportanceAvailable: Biology.isImportanceAvailable,
        isVisible: Biology.isVisible,
        position: Biology.position,
        questionCount: Biology.questionsCount,
      },
    });
    await delay(100);
    console.log("Subject seeded successfully.", subject);

    for (const item of Biology.units) {
      const unit = await prisma.unit.create({
        data: {
          unitName: item.unit.title,
          isVisible: item.unit.isVisible,
          totalChapters: item.unit.totalChapters,
          subjectId: subject.id,
        },
      });
      await delay(100);
      console.log("Unit seeded successfully.", unit);

      for (const chap of item.chapters) {
        const chapter = await prisma.chapter.create({
          data: {
            chapterName: chap.title,
            importance: chap.importance,
            isVisible: chap.isVisible,
            order: chap.order,
            priority: chap.priority,
            questionCount: chap.questionsCount,
            syllabusCategory: chap.syllabusCategory,
            classId: chap.class,
            subjectId: subject.id,
            unitId: unit.id,
            isTopicSyllabusFilterAvailable: chap.isTopicSyllabusFilterAvailable,
          },
        });
        await delay(100);
        console.log("Chapter seeded successfully.", chapter);

        for (const topic of chap.topics) {
          await prisma.topics.create({
            data: {
              topicName: topic.descriptionTitle,
              isVisible: topic.isVisible,
              position: topic.position,
              noOfQuestions: topic.numberOfQuestions,
              isMustDo: topic.isMustDo,
              syllabusCategory: topic.syllabusCategory,
              chapterId: chapter.id,
            },
          });
          await delay(100);
        }
      }
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    console.log("Seeding process finished.");
    await prisma.$disconnect();
  }
})();
