import z from "zod";

import { createTestSchema } from "./schema";

export type InputTypeCreateTest = z.infer<typeof createTestSchema>;
export type ReturnTypeCreateTest = z.output<typeof createTestSchema>;
