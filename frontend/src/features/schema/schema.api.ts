import { he } from "../../shared/constants/i18";
import { request } from "../../shared/network/request";
import type { IQuestion, ISchema, ISection } from "./schemaTypes";

export const createSchema = (userId: string): Promise<ISchema> =>
  request<ISchema>({
    method: "POST",
    url: `/schemas/${userId}`,
    data: { title: he.schema.creation.defaultTitleSchema },
  });

export const getSchema = (schemaId: string | undefined): Promise<ISchema> =>
  request<ISchema>({
    method: "GET",
    url: `/schemas/${schemaId}`,
  });

export const createSection = (schemaId: string): Promise<ISection> =>
  request<ISection>({
    method: "PATCH",
    url: `/schemas/${schemaId}/createSection`,
  });

export const createQuestion = (
  schemaId: string,
  sectionId: string,
): Promise<IQuestion> =>
  request<IQuestion>({
    method: "PATCH",
    url: `/schemas/${schemaId}/createQuestion`,
    data: { sectionId },
  });
