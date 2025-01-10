import z from "zod";
import { updateRoleSchema } from "./schema";
import { ActionState } from "@workspace/ui/lib/createAction";
import { User } from "@workspace/database";

export type InputTypeUpdateRole = z.infer<typeof updateRoleSchema>
export type RetrunTypeUpdateRole = ActionState<InputTypeUpdateRole, Pick<User, "role">>
