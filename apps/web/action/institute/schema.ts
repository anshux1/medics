import z from "zod";

export const createInstituteSchema = z.object({
  name: z.string().min(1).max(255),
  descriotion: z.string().min(1).max(255),
  email: z.string().email(),
  city: z.string().min(1).max(255),
});
