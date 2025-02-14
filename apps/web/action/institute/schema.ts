import z from "zod";

export const createInstituteSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  email: z.string().email(),
  city: z.string().min(1).max(255),
});

export const deleteInstituteSchema = z.object({
  id: z.string().cuid({ message: "Invalid institute id" }),
});
