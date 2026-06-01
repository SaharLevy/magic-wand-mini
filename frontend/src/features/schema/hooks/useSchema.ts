import {
  createQuestion,
  createSchema,
  createSection,
  deleteQuestion,
  getSchema,
  getSchemas,
  publishSchema,
  updateSchema,
} from "../schema.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IQuestion, ISchema, ISection } from "../schemaTypes";

const TEMP_USER_ID = "507f1f77bcf86cd799439011";
const MISSING_SCHEMA_ID = "Missing schemaId";

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

export const useUpdateSchema = () => {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError } = useMutation<
    ISchema,
    Error,
    ISchema
  >({
    mutationFn: (updatedSchema) =>
      updateSchema(updatedSchema._id, updatedSchema),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["schema", updated._id] });
    },
  });

  return {
    updateSchema: mutate,
    schema: data,
    isPending,
    isError,
  };
};

export const useCreateSection = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<ISection, Error>({
    mutationFn: () => {
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
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
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
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

export const useGetSchemas = () => {
  const { data, isPending, isError } = useQuery<ISchema[]>({
    queryKey: ["schemas", TEMP_USER_ID],
    queryFn: () => getSchemas(TEMP_USER_ID),
  });

  return {
    schemas: data,
    isPending,
    isError,
  };
};

export const useDeleteQuestion = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<
    ISchema,
    Error,
    { sectionId: string; questionId: string }
  >({
    mutationFn: ({ sectionId, questionId }) => {
      if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
      return deleteQuestion(schemaId, sectionId, questionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schema", schemaId] });
    },
  });

  return { deleteQuestion: mutateAsync, isPending, isError };
};

export const usePublishSchema = (schemaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<ISchema, Error, void>(
    {
      mutationFn: () => {
        if (!schemaId) throw new Error(MISSING_SCHEMA_ID);
        return publishSchema(schemaId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["schema", schemaId] });
      },
    },
  );

  return { publishSchema: mutateAsync, isPending, isError };
};
