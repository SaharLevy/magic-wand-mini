import type { Types } from "mongoose";

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

export const SchemaScopes = ["Private", "Assigned", "Public"] as const;
export type SchemaScope = (typeof SchemaScopes)[number];

export interface IOption {
  optionId: string;
  text: string;
  order: number;
}

export interface IValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface IQuestion {
  questionId: string;
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

  validation?: IValidation;
}

export interface ISection {
  sectionId: string;
  title: string;
  description?: string;
  order: number;
  questions: IQuestion[];
}

export interface ISchema {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  version: number;
  baseSchemaId: Types.ObjectId | null;
  status: SchemaStatus;
  scope: SchemaScope;
  createdBy: Types.ObjectId;
  assignedUsers: Types.ObjectId[];
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}