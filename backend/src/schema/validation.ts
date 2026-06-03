import { z } from "zod";
import {
  updateQuestionSchema,
  updateSectionSchema,
  sectionIdSchema,
  createSchemaBody,
  schemaWithIdSchema,
} from "./types.js";
import { objectIdString } from "../shared/types.js";

const schemasValidation = {
  getSchemasByUserId: {
    params: z
      .object({
        userId: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  getSchemaById: {
    params: z
      .object({
        schemaId: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  createSchema: {
    params: z.object({
      userId: objectIdString,
    }),
    body: createSchemaBody,
    query: z.object({}),
  },
  createSection: {
    params: z
      .object({
        schemaId: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  createQuestion: {
    params: z
      .object({
        schemaId: objectIdString,
      })
      .strict(),
    body: sectionIdSchema,
    query: z.object({}),
  },
  deleteSchema: {
    params: z.object({ schemaId: objectIdString }),
    body: z.object({}),
    query: z.object({}),
  },
  deleteSection: {
    params: z.object({ schemaId: objectIdString }),
    body: z.object({
      sectionId: objectIdString,
    }),
    query: z.object({}),
  },
  deleteQuestion: {
    params: z.object({ schemaId: objectIdString }),
    body: z.object({
      sectionId: objectIdString,
      questionId: objectIdString,
    }),
    query: z.object({}),
  },
  updateSchemaById: {
    params: z.object({
      schemaId: objectIdString,
    }),
    body: schemaWithIdSchema,
    query: z.object({}),
  },
  publishSchema: {
    params: z.object({ schemaId: objectIdString }).strict(),
    body: z.object({}),
    query: z.object({}),
  },
  updateSection: {
    params: z.object({
      schemaId: objectIdString,
    }),
    body: updateSectionSchema,
    query: z.object({}),
  },
  updateQuestion: {
    params: z.object({
      schemaId: objectIdString,
    }),
    body: updateQuestionSchema,
    query: z.object({}),
  },
};

export default schemasValidation;
