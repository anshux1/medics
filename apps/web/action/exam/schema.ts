import z from "zod";

export const joinExamSchema = z.object({
  testCode: z.string().min(6, { message: "Invalid test code" }),
  testPassword: z.string().min(6, { message: "Invalid test password" }),
});
