import type { Types } from "mongoose";
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

export const SchemaStatuses = [
  SchemaStatus.Draft,
  SchemaStatus.Published,
] as const;

export const objectIdString = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId");

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

export const schemaInputSchema = z.object({
  title: z.string().min(1, "Schema title is required"),
  description: z.string().optional(),
  status: z.enum(SchemaStatuses).default(SchemaStatus.Draft),
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

// Infer base types
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInputSchema>;

export type IOptionWithId = IOption & { _id?: Types.ObjectId };
export type IQuestionWithId = Omit<IQuestion, "options"> & {
  _id?: Types.ObjectId;
  options?: IOptionWithId[];
};
export type ISectionWithId = Omit<ISection, "questions"> & {
  _id?: Types.ObjectId;
  questions: IQuestionWithId[];
};

export type ISchemaInputWithObjectIds = Omit<
  ISchemaInput,
  "createdBy" | "assignedUsers"
> & {
  createdBy: Types.ObjectId;
  assignedUsers: Types.ObjectId[];
};

export type ISchemaUpdateWithObjectIds = Omit<
  ISchemaUpdate,
  "assignedUsers"
> & {
  assignedUsers?: Types.ObjectId[];
};

export type ISchema = Omit<
  ISchemaInput,
  "sections" | "createdBy" | "assignedUsers"
> & {
  _id: Types.ObjectId;
  createdBy: Types.ObjectId;
  assignedUsers: Types.ObjectId[];
  sections: ISectionWithId[];
};

export type ISchemaUpdate = z.infer<typeof schemaUpdateSchema>;
export type ISectionUpdate = z.infer<typeof sectionUpdateSchema>;
export type IQuestionUpdate = z.infer<typeof questionUpdateSchema>;

export interface IQuestionUpdateRequest extends IQuestionUpdate {
  sectionId: string;
  questionId: string;
}

export interface ISectionUpdateRequest extends ISectionUpdate {
  sectionId: string;
}
