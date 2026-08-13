import { request } from "../../shared/network/request";
import type {
  IInstance,
  IInstancePopulated,
  IInstanceWithSchemaRef,
} from "./instanceTypes";

export const getInstances = (
  userId: string,
): Promise<IInstanceWithSchemaRef[]> =>
  request<IInstanceWithSchemaRef[]>({
    method: "GET",
    url: `/instances/${userId}/instances`,
  });

export const getInstance = (instanceId: string): Promise<IInstancePopulated> =>
  request<IInstancePopulated>({
    method: "GET",
    url: `/instances/${instanceId}`,
  });

export const createInstance = (
  schemaId: string,
  filledBy: string,
): Promise<IInstance> =>
  request<IInstance>({
    method: "POST",
    url: `/instances/${schemaId}`,
    data: { filledBy },
  });

export const submitInstance = (
  instanceId: string,
  instance: IInstance,
): Promise<IInstance> =>
  request<IInstance>({
    method: "PATCH",
    url: `/instances/${instanceId}/status`,
    data: instance,
  });

export const deleteInstance = (instanceId: string): Promise<IInstance> =>
  request<IInstance>({
    method: "DELETE",
    url: `/instances/${instanceId}/instance`,
  });
