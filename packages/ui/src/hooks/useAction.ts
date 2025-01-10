import { ActionState, FieldErrors } from "@workspace/ui/lib/createAction";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (input: TInput) => Promise<ActionState<TInput, TOutput>>;

interface useActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: useActionOptions<TOutput>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);

  const execute = useCallback(async (input: TInput) => {
    setIsLoading(true);
    try {
      const result = await action(input);
      if (!result) return;
      if (result.error) {
        setError(result.error);
        if (options?.onError) {
          options.onError(result.error);
        }
      }
      if (result.data) {
        setData(result.data);
        if (options?.onSuccess) {
          options.onSuccess(result.data);
        }
      }
    } finally {
      setIsLoading(false);
      if (options?.onComplete) {
        options.onComplete();
      }
    }
  }, [action, options]);

  return {
    execute,
    data,
    error,
    isLoading,
    fieldErrors,
    setFieldErrors,
  };
};
