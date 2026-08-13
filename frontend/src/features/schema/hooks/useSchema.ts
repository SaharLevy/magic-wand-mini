import {
  createQuestion,
  createSchema,
  createSection,
  deleteQuestion,
  deleteSchema,
  getSchema,
  getSchemas,
  publishSchema,
  updateSchema,
} from "../schema.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ISchema } from "../schemaTypes";
import { schemaKeys } from "../schemaKeys";

export const TEMP_USER_ID = "507f1f77bcf86cd799439011";
const MISSING_SCHEMA_ID = "Missing schemaId";

export const useGetSchemas = () =>
  useQuery({
    queryKey: schemaKeys.list(TEMP_USER_ID),
    queryFn: () => getSchemas(TEMP_USER_ID),
    initialData: [],
  });

export const useGetSchema = (schemaId: string | undefined) =>
  useQuery({
    queryKey: schemaKeys.detail(schemaId!),
    queryFn: () => getSchema(schemaId),
    enabled: !!schemaId,
  });

export const useCreateSchema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createSchema(TEMP_USER_ID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schemaKeys.all });
    },
  });
};

export const useUpdateSchema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedSchema: ISchema) =>
      updateSchema(updatedSchema._id, updatedSchema),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: schemaKeys.detail(updated._id),
      });
    },
  });
};

export const useCreateSection = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
      return createSection(schemaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schemaKeys.detail(schemaId!) });
    },
  });
};

export const useCreateQuestion = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: string) => {
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
      return createQuestion(schemaId, sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schemaKeys.detail(schemaId!) });
    },
  });
};

export const useDeleteQuestion = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      questionId,
    }: {
      sectionId: string;
      questionId: string;
    }) => {
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
      return deleteQuestion(schemaId, sectionId, questionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schemaKeys.detail(schemaId!) });
    },
  });
};

export const useDeleteSchema = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schemaId: string) => deleteSchema(schemaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schemaKeys.all });
    },
  });
};

export const usePublishSchema = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
      return publishSchema(schemaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schemaKeys.all });
    },
  });
};
