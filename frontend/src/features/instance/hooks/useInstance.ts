import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IInstance } from "../instanceTypes";
import {
  createInstance,
  deleteInstance,
  getInstance,
  getInstances,
  submitInstance,
} from "../instance.api";
import { TEMP_USER_ID } from "../../schema/hooks/useSchema";
import { instanceKeys } from "../instanceKeys";

export const useGetInstances = () =>
  useQuery({
    queryKey: instanceKeys.list(TEMP_USER_ID),
    queryFn: () => getInstances(TEMP_USER_ID),
    initialData: [],
  });

export const useGetInstance = (instanceId: string | undefined) =>
  useQuery({
    queryKey: instanceKeys.detail(instanceId!),
    queryFn: () => getInstance(instanceId!),
    enabled: !!instanceId,
  });

export const useCreateInstance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schemaId: string) => createInstance(schemaId, TEMP_USER_ID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: instanceKeys.all });
    },
  });
};

export const useSubmitInstance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instance: IInstance) => submitInstance(instance._id, instance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: instanceKeys.all });
    },
  });
};

export const useDeleteInstance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instanceId: string) => deleteInstance(instanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: instanceKeys.all });
    },
  });
};
