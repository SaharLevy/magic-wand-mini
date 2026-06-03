import { he } from "../../shared/constants/i18";
import { request } from "../../shared/network/request";
import type { IQuestion, ISchema, ISection } from "./schemaTypes";

//userId is missing for now.

export const getSchemas = (userId: string): Promise<ISchema[]> =>
  request<ISchema[]>({
    method: "GET",
    url: `/schemas/${userId}/getSchemas`,
  });

export const createSchema = (userId: string): Promise<ISchema> =>
  request<ISchema>({
    method: "POST",
    url: `/schemas/${userId}`,
    data: { title: he.schema.creation.defaultTitleSchema },
  });

export const updateSchema = (
  schemaId: string,
  updatedSchema: ISchema,
): Promise<ISchema> =>
  request<ISchema>({
    method: "PUT",
    url: `/schemas/${schemaId}`,
    data: updatedSchema,
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

export const deleteSchema = (schemaId: string): Promise<ISchema> =>
  request<ISchema>({
    method: "DELETE",
    url: `/schemas/${schemaId}/schema`,
  });

export const deleteQuestion = (
  schemaId: string,
  sectionId: string,
  questionId: string,
): Promise<ISchema> =>
  request<ISchema>({
    method: "DELETE",
    url: `/schemas/${schemaId}/question`,
    data: { sectionId, questionId },
  });

export const publishSchema = (schemaId: string): Promise<ISchema> =>
  request<ISchema>({
    method: "PATCH",
    url: `/schemas/${schemaId}/publish`,
  });
