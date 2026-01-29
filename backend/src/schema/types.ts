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

export type QuestionType = (typeof QuestionTypes)[number];

export const SchemaStatuses = ["Draft", "Published"] as const;
export type SchemaStatus = (typeof SchemaStatuses)[number];

export interface IOption {
  _id?: Types.ObjectId;
  text: string;
  order: number;
}
export interface IQuestion {
  _id?: Types.ObjectId;
  type: QuestionType;
  title: string;
  description?: string | undefined;
  required: boolean;
  order: number;
  // For choice-based questions (RADIO, CHECKBOX, DROPDOWN)
  options?: IOption[] | undefined;
  // For LINEAR_SCALE
  scaleMin?: number | undefined;
  scaleMax?: number | undefined;
  scaleMinLabel?: string | undefined;
  scaleMaxLabel?: string | undefined;
  // For table questions (RADIO_TABLE, CHECKBOX_TABLE)
  rows?: string[] | undefined;
  columns?: string[] | undefined;
}

export interface IQuestionUpdateRequest extends IQuestionUpdate {
  sectionId: string;
  questionId: string;
}

export interface ISection {
  _id?: Types.ObjectId;
  title: string;
  description?: string | undefined;
  order: number;
  questions: IQuestion[];
}

export interface ISectionUpdateRequest extends ISectionUpdate {
  sectionId: string;
}

export interface ISchema {
  _id: Types.ObjectId;
  title: string;
  description?: string | undefined;
  status: SchemaStatus;
  createdBy: Types.ObjectId;
  assignedUsers: Types.ObjectId[];
  sections: ISection[];
}

export type ISchemaInput = Omit<ISchema, "_id">;
export type ISchemaUpdate = Partial<
  Omit<ISchema, "_id" | "status" | "createdBy" | "sections">
>;
export type ISectionUpdate = Partial<Omit<ISection, "_id" | "questions">>;
export type IQuestionUpdate = Partial<Omit<IQuestion, "_id">>;
