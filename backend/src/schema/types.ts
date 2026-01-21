import type { Types } from "mongoose";
import { omit } from "zod/mini";

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

export type QuestionType = (typeof QuestionTypes)[number];

export const SchemaStatuses = ["Draft", "Published", "Archived"] as const;
export type SchemaStatus = (typeof SchemaStatuses)[number];

export interface IOption {
  _id: Types.ObjectId;
  text: string;
  order: number;
}
// Will check later on if _id is troublesome.
export interface IQuestion {
  _id: Types.ObjectId;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  order: number;
  // For choice-based questions (RADIO, CHECKBOX, DROPDOWN)
  options?: IOption[];
  // For LINEAR_SCALE
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  // For table questions (RADIO_TABLE, CHECKBOX_TABLE)
  rows?: string[];
  columns?: string[];
}

export type IQuestionNoId = Omit<IQuestion, "_id">;

export interface ISection {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  order: number;
  questions: IQuestion[];
}

export type ISectionNoId = Omit<ISection, "_id">;

export interface ISchema {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: SchemaStatus;
  createdBy: Types.ObjectId;
  assignedUsers: Types.ObjectId[];
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}

export type ISchemaNoId = Omit<ISchema, "_id">;
