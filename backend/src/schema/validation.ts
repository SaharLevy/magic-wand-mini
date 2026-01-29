import { z } from "zod";
import { QuestionTypes, SchemaStatuses } from "./types.js";


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
        id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  createSchema: {
    params: z.object({}),
    body: z.object({
      title: z.string().min(1, "Schema title is required"),
      description: z.string().optional(),
      status: z.enum(SchemaStatuses).default("Draft"),
      createdBy: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      assignedUsers: z
        .array(z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"))
        .default([]),
      sections: z.array(sectionSchema).default([]),
    }),
    query: z.object({}),
  },
  deleteSection: {
    params: z.object({}),
    body: z.object({
      schemaId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      sectionId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
    }),
    query: z.object({}),
  },
  deleteQuestion: {
    params: z.object({}),
    body: z.object({
      schemaId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      sectionId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      questionId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
    }),
    query: z.object({}),
  },
  updateSchemaById: {
    params: z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
    }),
    body: z.object({
      title: z.string().min(1, "Schema title is required").optional(),
      description: z.string().optional(),
      assignedUsers: z
        .array(z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"))
        .optional(),
    }),
    query: z.object({}),
  },
  updateSection: {
    params: z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
    }),
    body: z.object({
      sectionId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      title: z.string().min(1, "Schema title is required").optional(),
      description: z.string().optional(),
      order: z.number().int().min(0).optional(),
    }),
    query: z.object({}),
  },
  updateQuestion: {
    params: z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
    }),
    body: z.object({
      sectionId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      questionId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
      type: z.enum(QuestionTypes).optional(),
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      required: z.boolean().default(false).optional(),
      order: z.number().int().min(0).optional(),
      options: z.array(optionSchema).optional(),
      scaleMin: z.number().int().optional(),
      scaleMax: z.number().int().optional(),
      scaleMinLabel: z.string().optional(),
      scaleMaxLabel: z.string().optional(),
      rows: z.array(z.string()).optional(),
      columns: z.array(z.string()).optional(),
    }),
    query: z.object({}),
  },
};

export default schemasValidation;
