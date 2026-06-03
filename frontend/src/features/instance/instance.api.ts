import { request } from "../../shared/network/request";
import type { IInstance } from "./instanceTypes";

export const getInstance = (userId: string): Promise<IInstance[]> =>
  request<IInstance[]>({
    method: "GET",
    url: `/schemas/${userId}/getSchemas`,
  });
