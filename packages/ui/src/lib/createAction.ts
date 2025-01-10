import z from "zod";

export type FieldErrors<T> = {
  [key in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  FieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (input: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
  return async (input: TInput) => {
    const result = schema.safeParse(input);
    if (!result.success) {
      return {
        FieldErrors: result.error.flatten().fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(input);
  };
};
