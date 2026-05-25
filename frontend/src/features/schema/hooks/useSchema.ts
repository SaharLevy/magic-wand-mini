import {
  createQuestion,
  createSchema,
  createSection,
  getSchema,
} from "../schema.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ISchema, ISection } from "../schemaTypes";

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

export const useCreateSection = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation<ISection, Error>({
    mutationFn: () => {
      if (!schemaId) throw new Error("Missing schemaId");
      return createSection(schemaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schema", schemaId] });
    },
  });

  return { createSection: mutate, isPending, isError };
};

export const useCreateQuestion = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation<ISchema, Error, string>({
    mutationFn: (sectionId: string) => {
      if (!schemaId) throw new Error("Missing schemaId");
      return createQuestion(schemaId, sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schema", schemaId] });
    },
  });

  return { createQuestion: mutate, isPending, isError };
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
