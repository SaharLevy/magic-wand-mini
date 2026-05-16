import { createSchema } from "../schema.api";
import { useMutation } from "@tanstack/react-query";
import type { ISchema } from "../schemaTypes";

const TEMP_USER_ID = "507f1f77bcf86cd799439011";

export const useCreateSchema = () => {
  const { mutate, data, isPending, isError } = useMutation<ISchema, Error>({
    mutationFn: () => createSchema(TEMP_USER_ID),
  });

  return {
    createSchema: mutate,
    schema: data,
    isPending,
    isError,
  };
};
