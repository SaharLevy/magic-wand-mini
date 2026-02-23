import { z } from "zod";
import {
  schemaInput,
  updateSchema,
  updateQuestionSchema,
  updateSectionSchema,
  sectionIdSchema,
} from "./types.js";
import { objectIdString } from "../shared/types.js";

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
    params: z.object({
      schemaId: objectIdString,
    }),
    body: schemaInput,
    query: z.object({}),
  },
  createSection: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  createQuestion: {
    params: z
      .object({
        id: objectIdString,
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
    body: updateSchema,
    query: z.object({}),
  },
  updateSection: {
    params: z.object({
      id: objectIdString,
    }),
    body: updateSectionSchema,
    query: z.object({}),
  },
  updateQuestion: {
    params: z.object({
      id: objectIdString,
    }),
    body: updateQuestionSchema,
    query: z.object({}),
  },
};

export default schemasValidation;
