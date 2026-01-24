import { z } from "zod";
import { QuestionTypes, SchemaStatuses } from "./types.js";

const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  order: z.number().int().min(0),
});

const questionSchema = z.object({
  type: z.enum(QuestionTypes),
  title: z.string().min(1, "Question title is required"),
  description: z.string().optional(),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
  options: z.array(optionSchema).optional(),
  scaleMin: z.number().int().optional(),
  scaleMax: z.number().int().optional(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
  rows: z.array(z.string()).optional(),
  columns: z.array(z.string()).optional(),
});

const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
  order: z.number().int().min(0),
  questions: z.array(questionSchema).default([]),
});

const schemasValidation = {
  getSchemas: {
    params: z.object({}),
    body: z.object({}),
    query: z.object({}),
  },
  getSchemasStatusDraft: {
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
};

export default schemasValidation;
