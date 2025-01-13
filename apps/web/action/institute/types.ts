import z from "zod";

import { ActionState } from "@workspace/ui/lib/createAction";
import { Institute } from "@workspace/database";
import { createInstituteSchema, deleteInstituteSchema } from "./schema";

export type InputTypeCreateInstitute = z.infer<typeof createInstituteSchema>;
export type ReturnTypeCreateInstitute = ActionState<
  InputTypeCreateInstitute,
  Partial<Institute>
>;

export type InputTypeDeleteInstitute = z.infer<typeof deleteInstituteSchema>;
export type ReturnTypeDeleteInstitute = ActionState<
  InputTypeDeleteInstitute,
  Partial<Institute>
>;
