import z from "zod";
import { createInstituteSchema } from "./schema";
import { ActionState } from "@workspace/ui/lib/createAction";
import { Institute } from "@workspace/database";

export type InputTypeCreateInstitute = z.infer<typeof createInstituteSchema>;
export type ReturnTypeCreateInstitute = ActionState<InputTypeCreateInstitute, Partial<Institute>>;
