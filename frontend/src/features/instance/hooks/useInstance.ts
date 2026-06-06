import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  IInstance,
  IInstancePopulated,
  IInstanceWithSchemaTitle,
} from "../instanceTypes";
import {
  createInstance,
  deleteInstance,
  getInstance,
  getInstances,
} from "../instance.api";
import { TEMP_USER_ID } from "../../schema/hooks/useSchema";

export const useGetInstances = () => {
  const { data, isPending, isError } = useQuery<IInstanceWithSchemaTitle[]>({
    queryKey: ["instances", TEMP_USER_ID],
    queryFn: () => getInstances(TEMP_USER_ID),
    initialData: [],
  });

  return {
    instances: data,
    isPending,
    isError,
  };
};

export const useGetInstance = (instanceId: string | undefined) => {
  const { data, isPending, isError } = useQuery<IInstancePopulated>({
    queryKey: ["instance", instanceId],
    queryFn: () => getInstance(instanceId!),
    enabled: !!instanceId,
  });

  return {
    instance: data,
    isPending,
    isError,
  };
};

export const useCreateInstance = () => {
  const { mutate, data, isPending, isError } = useMutation<
    IInstancePopulated,
    Error,
    string
  >({
    mutationFn: (schemaId: string) => createInstance(schemaId, TEMP_USER_ID),
  });

  return {
    createInstance: mutate,
    instance: data,
    createIsPending: isPending,
    isError,
  };
};

export const useDeleteInstance = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation<
    IInstance,
    Error,
    string
  >({
    mutationFn: (instanceId: string) => deleteInstance(instanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instances"] });
    },
  });

  return { deleteInstance: mutateAsync, deleteIsPending: isPending, isError };
};
