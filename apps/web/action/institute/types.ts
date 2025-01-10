import z from "zod";

import { ActionState } from "@workspace/ui/lib/createAction";
import { Institute } from "@workspace/database";
import { createInstituteSchema } from "./schema";

export type InputTypeCreateInstitute = z.infer<typeof createInstituteSchema>;
export type ReturnTypeCreateInstitute = ActionState<
  InputTypeCreateInstitute,
  Partial<Institute>
>;
