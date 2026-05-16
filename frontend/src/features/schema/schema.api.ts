import { he } from "../../shared/constants/i18";
import { request } from "../../shared/network/request";
import type { ISchema } from "./schemaTypes";

export const createSchema = (userId: string): Promise<ISchema> =>
  request<ISchema>({
    method: "POST",
    url: `/schemas/${userId}`,
    data: { title: he.schema.creation.defaultTitle },
  });
