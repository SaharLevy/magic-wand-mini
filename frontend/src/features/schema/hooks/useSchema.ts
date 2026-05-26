import {
  createQuestion,
  createSchema,
  createSection,
  getSchema,
  updateSchema,
} from "../schema.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IQuestion, ISchema, ISection } from "../schemaTypes";

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

export const useUpdateSchema = (updatedSchema: ISchema) => {
  const { mutate, data, isPending, isError } = useMutation<ISchema, Error>({
    mutationFn: () => updateSchema(TEMP_USER_ID, updatedSchema),
  });

  return {
    createSchema: mutate,
    schema: data,
    isPending,
    isError,
  };
};

export const useCreateSection = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<ISection, Error>({
    mutationFn: () => {
      if (!schemaId) throw new Error("Missing schemaId");
      return createSection(schemaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schema", schemaId] });
    },
  });

  return { createSection: mutateAsync, isPending, isError };
};

export const useCreateQuestion = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<
    IQuestion,
    Error,
    string
  >({
    mutationFn: (sectionId: string) => {
      if (!schemaId) throw new Error("Missing schemaId");
      return createQuestion(schemaId, sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schema", schemaId] });
    },
  });

  return { createQuestion: mutateAsync, isPending, isError };
};

export const useGetSchema = (schemaId: string | undefined) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["schema", schemaId],
    queryFn: () => getSchema(schemaId),
    enabled: !!schemaId,
  });

  return {
    schema: data,
    isPending,
    isError,
  };
};
