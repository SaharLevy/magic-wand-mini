import { z } from "zod";
import {
  schemaInput,
  updateSchema,
  updateQuestionSchema,
  updateSectionSchema,
  sectionIdSchema,
  statusesSchema,
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
    query: statusesSchema,
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
  deleteSection: {
    params: z.object({}),
    body: z.object({
      schemaId: objectIdString,
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
