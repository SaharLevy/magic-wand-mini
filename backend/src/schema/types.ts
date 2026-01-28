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

export interface ISection {
  _id?: Types.ObjectId;
  title: string;
  description?: string | undefined;
  order: number;
  questions: IQuestion[];
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
export type IQuestionUpdate = Partial<Omit<IQuestion,"_id">>
