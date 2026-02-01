import { z } from "zod";
import {
  objectIdString,
  questionUpdateSchema,
  schemaInput,
  schemaUpdateSchema,
  sectionUpdateSchema,
} from "./types.js";

const schemasValidation = {
  getSchemas: {
    params: z.object({}),
    body: z.object({}),
    query: z.object({}),
  },
  getAllDrafts: {
    params: z.object({}),
    body: z.object({}),
    query: z.object({}),
  },
  getSchemaById: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  createSchema: {
    params: z.object({}),
    body: schemaInput,
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
    params: z.object({}),
    body: z.object({
      schemaId: objectIdString,
      sectionId: objectIdString,
      questionId: objectIdString,
    }),
    query: z.object({}),
  },
  updateSchemaById: {
    params: z.object({
      id: objectIdString,
    }),
    body: schemaUpdateSchema,
    query: z.object({}),
  },
  updateSection: {
    params: z.object({
      id: objectIdString,
    }),
    body: sectionUpdateSchema.extend({
      sectionId: objectIdString,
    }),
    query: z.object({}),
  },
  updateQuestion: {
    params: z.object({
      id: objectIdString,
    }),
    body: questionUpdateSchema.extend({
      sectionId: objectIdString,
      questionId: objectIdString,
    }),
    query: z.object({}),
  },
};

export default schemasValidation;
