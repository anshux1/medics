import { Role } from "@workspace/database";

export const OnBoardingComfig = {
  step1: {
    heading: "Shape the Future of Education",
    description:
      "Institutes can create and manage tests, providing students with valuable learning resources like previous year questions (PYQs) and customized assessments. Students can participate in these tests, evaluate their skills, and gain insights to improve their performance.",
    items: [
      {
        value: Role.INSTITUTE,
        label: "Institute",
        Icon: "https://prepmedics.blob.core.windows.net/prepmedics/college-svgrepo-com.svg",
        description:
          "Create and manage tests for students. Provide additional resources, including previous year questions to enhance learning and evaluation.",
      },
      {
        value: Role.STUDENT,
        label: "Student",
        Icon: "https://prepmedics.blob.core.windows.net/prepmedics/paying-for-college-round-svgrepo-com.svg",
        description:
          "Access tests and resources provided by the institute. Access a wide range of test papers, including PYQs, and evaluate your knowledge",
      },
    ],
  },
  step2: {
    heading: "Create Your Institute Profile",
    description:
      "Provide the details of your institute to start creating and managing tests for your students. This information will help you set up your institute and organize your test content efficiently.",
  },
};
