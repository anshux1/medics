import { getSubjects, getUnits } from "@/data/subjects";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TestCreateForm } from "@/components/test/TestCreateForm";
import { WordFadeIn } from "@workspace/ui/components/word-fade-in";

export default async function page() {
  const subjects = await getSubjects();
  const units = await getUnits();
  return (
    <div>
      <DashboardHeader />
      <div className="p-4 md:p-7">
        <WordFadeIn
          words="Create new test"
          className="scroll-m-20 text-start text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
        />
        <h3 className="w-11/12 leading-7 opacity-80 md:w-3/5 [&:not(:first-child)]:mt-3">
          Create a new test effortlessly. Set up quizzes and tests tailored to
          your needs with intuitive and user-friendly tools.
        </h3>
        <TestCreateForm subjects={subjects} units={units} />
      </div>
    </div>
  );
}
