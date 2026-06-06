import { request } from "../../shared/network/request";
import type {
  IInstance,
  IInstancePopulated,
  IInstanceWithSchemaTitle,
} from "./instanceTypes";

export const getInstances = (
  userId: string,
): Promise<IInstanceWithSchemaTitle[]> =>
  request<IInstanceWithSchemaTitle[]>({
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
): Promise<IInstancePopulated> =>
  request<IInstancePopulated>({
    method: "POST",
    url: `/instances/${schemaId}`,
    data: { filledBy },
  });

export const deleteInstance = (instanceId: string): Promise<IInstance> =>
  request<IInstance>({
    method: "DELETE",
    url: `/instances/${instanceId}/instance`,
  });
