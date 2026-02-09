import { z } from "zod";
import {
  checkboxSchema,
  checkboxTableSchema,
  dateSchema,
  dropdownSchema,
  linearScaleSchema,
  MongoObjectId,
  objectIdString,
  optionSchema,
  paragraphSchema,
  radioSchema,
  radioTableSchema,
  timeSchema,
} from "../shared/types.js";
import { shortTextSchema } from "../shared/types.js";

export enum SchemaStatus {
  Draft = "Draft",
  Published = "Published",
}

export const baseQuestionFields = z.object({
  title: z.string().min(1, "Question title is required"),
  description: z.string().optional(),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
});

export const questionSchema = z
  .discriminatedUnion("type", [
    shortTextSchema,
    paragraphSchema,
    radioSchema,
    checkboxSchema,
    dropdownSchema,
    linearScaleSchema,
    radioTableSchema,
    checkboxTableSchema,
    dateSchema,
    timeSchema,
  ])
  .and(baseQuestionFields);

export const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
  order: z.number().int().min(0),
  questions: z.array(questionSchema).default([]),
});

export const schemaInput = z.object({
  title: z.string().min(1, "Schema title is required"),
  description: z.string().optional(),
  status: z.enum(SchemaStatus).default(SchemaStatus.Draft),
  createdBy: objectIdString,
  assignedUsers: z.array(objectIdString).default([]),
  sections: z.array(sectionSchema).default([]),
});

// Updates

export const updateSchema = z.object({
  title: z.string().min(1, "Schema title is required").optional(),
  description: z.string().optional(),
  assignedUsers: z.array(objectIdString).optional(),
  status: z.enum(SchemaStatus).optional(),
});

export const updateSectionSchemaWithoutId = z.object({
  title: z.string().min(1, "Section title is required").optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateQuestionsSchemaWithoutIds = z.discriminatedUnion("type", [
  shortTextSchema.partial(),
  paragraphSchema.partial(),
  radioSchema.partial(),
  checkboxSchema.partial(),
  dropdownSchema.partial(),
  linearScaleSchema.partial(),
  radioTableSchema.partial(),
  checkboxTableSchema.partial(),
  dateSchema.partial(),
  timeSchema.partial(),
]);

const questionIdsSchema = z.object({
  sectionId: objectIdString,
  questionId: objectIdString,
});

const sectionIdSchema = z.object({
  sectionId: objectIdString,
});

export const updateSectionSchema = z.intersection(
  sectionIdSchema,
  updateSectionSchemaWithoutId,
);

export const updateQuestionSchema = z.intersection(
  questionIdsSchema,
  updateQuestionsSchemaWithoutIds,
);

// Infer base types
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInput>;
export type ISchema = ISchemaInput & { _id: MongoObjectId };

export type ISchemaUpdate = z.infer<typeof updateSchema>;
export type ISectionUpdate = z.infer<typeof updateSectionSchemaWithoutId>;
export type ISectionUpdateRequest = z.infer<typeof updateSectionSchema>;
export type IQuestionUpdate = Partial<IQuestion>;
export type IQuestionUpdateRequest = z.infer<typeof updateQuestionSchema>;
