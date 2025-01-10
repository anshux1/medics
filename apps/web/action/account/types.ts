import z from "zod";

import { ActionState } from "@workspace/ui/lib/createAction";
import { User } from "@workspace/database";
import { updateRoleSchema } from "./schema";

export type InputTypeUpdateRole = z.infer<typeof updateRoleSchema>;
export type RetrunTypeUpdateRole = ActionState<
  InputTypeUpdateRole,
  Pick<User, "role">
>;
