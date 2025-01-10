import z from "zod";

import { joinExamSchema } from "./schema";

export type InputTypeJoinTest = z.infer<typeof joinExamSchema>;
