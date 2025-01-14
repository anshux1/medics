import z from "zod";

export const createTestSchema = z.object({
  name: z.string().min(1, { message: "Name is too short!" }),
  noOfQuestions: z.number().int().positive(),
  timeLimit: z.number().int().positive(),
  scheduled: z.boolean(),
  startDate: z.date().optional(),
  subjects: z.array(
    z.string().min(1, { message: "Please select Minium one subject!" }),
  ),
  chatpers: z.array(
    z.string().min(1, { message: "Please select Minium one chapter!" }),
  ),
});
