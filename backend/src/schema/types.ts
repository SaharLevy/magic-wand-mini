import { Types } from "mongoose";
import { z } from "zod";

export const QuestionTypes = [
  "SHORT_TEXT",
  "PARAGRAPH",
  "RADIO",
  "CHECKBOX",
  "DROPDOWN",
  "LINEAR_SCALE",
  "RADIO_TABLE",
  "CHECKBOX_TABLE",
  "DATE",
  "TIME",
] as const;

export enum SchemaStatus {
  Draft = "Draft",
  Published = "Published",
}

export const objectIdString = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), { message: "Invalid ObjectId" })
  .transform((val) => new Types.ObjectId(val));

export const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  order: z.number().int().min(0),
});

export const questionSchema = z.object({
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

export const schemaUpdateSchema = z.object({
  title: z.string().min(1, "Schema title is required").optional(),
  description: z.string().optional(),
  assignedUsers: z.array(objectIdString).optional(),
});

export const sectionUpdateSchema = z.object({
  title: z.string().min(1, "Section title is required").optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

export const questionUpdateSchema = z.object({
  type: z.enum(QuestionTypes).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  options: z.array(optionSchema).optional(),
  scaleMin: z.number().int().optional(),
  scaleMax: z.number().int().optional(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
  rows: z.array(z.string()).optional(),
  columns: z.array(z.string()).optional(),
});

export type QuestionType = (typeof QuestionTypes)[number];
export type MongoObjectId = z.infer<typeof objectIdString>;

// Infer base types
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInput>;

export type ISchema = ISchemaInput & { _id: MongoObjectId };

export type ISchemaUpdate = z.infer<typeof schemaUpdateSchema>;
export type ISectionUpdate = z.infer<typeof sectionUpdateSchema>;
export type IQuestionUpdate = z.infer<typeof questionUpdateSchema>;

export interface IQuestionUpdateRequest extends IQuestionUpdate {
  sectionId: MongoObjectId;
  questionId: MongoObjectId;
}

export interface ISectionUpdateRequest extends ISectionUpdate {
  sectionId: MongoObjectId;
}
