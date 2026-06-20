import type { QuestionTypes } from "../../shared/sharedTypes";
import type { ISchema } from "../schema/schemaTypes";

export enum InstanceStatus {
  Draft = "Draft",
  Published = "Published",
}

// Specific Question Answers

export interface ShortTextAnswer {
  type: QuestionTypes.SHORT_TEXT;
  text: string;
}

export interface ParagraphAnswer {
  type: QuestionTypes.PARAGRAPH;
  text: string;
}

export interface RadioAnswer {
  type: QuestionTypes.RADIO;
  option: string;
  otherText?: string;
}

export interface CheckboxAnswer {
  type: QuestionTypes.CHECKBOX;
  options: string[];
  otherText?: string;
}

export interface DropdownAnswer {
  type: QuestionTypes.DROPDOWN;
  option: string;
}

export interface LinearScaleAnswer {
  type: QuestionTypes.LINEAR_SCALE;
  scaleNumber?: number;
}

export interface RadioTableAnswer {
  type: QuestionTypes.RADIO_TABLE;
  tableAnswers: { row: number; column: number }[];
}

export interface CheckboxTableAnswer {
  type: QuestionTypes.CHECKBOX_TABLE;
  tableAnswers: { row: number; columns: number[] }[];
}

export interface DateAnswer {
  type: QuestionTypes.DATE;
  date?: string;
}

export interface TimeAnswer {
  type: QuestionTypes.TIME;
  time?: string;
}

// Discriminated union + base fields

export interface BaseAnswerFields {
  questionId: string;
}

export type IAnswer = (
  | ShortTextAnswer
  | ParagraphAnswer
  | RadioAnswer
  | CheckboxAnswer
  | DropdownAnswer
  | LinearScaleAnswer
  | RadioTableAnswer
  | CheckboxTableAnswer
  | DateAnswer
  | TimeAnswer
) &
  BaseAnswerFields;

export type IAnswerUpdate = Partial<IAnswer>;

export interface ISectionAnswer {
  sectionId: string;
  answers: IAnswer[];
}

export interface IInstanceInput {
  schemaId: string;
  filledBy: string;
  status: InstanceStatus;
  sections: ISectionAnswer[];
  submittedAt?: string;
}

export type IInstance = IInstanceInput & { _id: string };

export interface AnswerIdSchema {
  sectionId: string;
  answerId: string;
}

export interface CreateInstance {
  filledBy: string;
}

export type IAnswerUpdateWithIds = AnswerIdSchema & Partial<IAnswer>;

export interface StatusesSchema {
  statuses: InstanceStatus[];
}

export type IInstancePopulated = Omit<IInstance, "schemaId"> & {
  schemaId: ISchema;
};

export type IInstanceWithSchemaTitle = Omit<IInstance, "schemaId"> & {
  schemaId: Pick<ISchema, "_id" | "title">;
};

export interface ValidationErrorData {
  details?: string[];
}

// Answer types (without the discriminator)

export type IText = Omit<ShortTextAnswer, "type">;
export type IScale = Omit<LinearScaleAnswer, "type">;
export type IOption = Omit<RadioAnswer, "type">;
export type IOptions = Omit<CheckboxAnswer, "type">;
export type IRadioTable = Omit<RadioTableAnswer, "type">;
export type ICheckboxTable = Omit<CheckboxTableAnswer, "type">;
export type IDate = Omit<DateAnswer, "type">;
export type ITime = Omit<TimeAnswer, "type">;
