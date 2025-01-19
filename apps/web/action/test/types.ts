import z from "zod";

import { ActionState } from "@workspace/ui/lib/createAction";
import { Test } from "@workspace/database";
import { createTestSchema } from "./schema";

export type InputTypeCreateTest = z.infer<typeof createTestSchema>;
export type ReturnTypeCreateTest = ActionState<InputTypeCreateTest, Test>;
