import z from "zod";

export const createTestSchema = z.object({
  name: z.string().min(1, { message: "Name is too short!" }),
  noOfQuestions: z.number().int().positive(),
  timeLimit: z.number().int().positive(),
  subjects: z.array(
    z.string().min(1, { message: "Please select Minium one subject!" }),
  ),
  instituteId: z
    .string()
    .min(1, { message: "Please select Institute!" })
    .optional(),
  chatpers: z.array(
    z.string().min(1, { message: "Please select Minium one chapter!" }),
  ),
  difficulty: z.number().positive(),
});
