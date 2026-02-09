import type { Types } from "mongoose";
import {
  MongoObjectId,
  objectIdString,
  paragraphSchema,
  QuestionTypes,
  shortTextSchema,
  radioSchema,
  checkboxSchema,
  dropdownSchema,
  linearScaleSchema,
  radioTableSchema,
  checkboxTableSchema,
  dateSchema,
  timeSchema,
} from "../shared/types.js";
import z from "zod";

export const InstanceStatuses = ["Draft", "Submitted"] as const;

export enum InstanceStatus {
  Draft = "Draft",
  Published = "Published",
}

export const baseAnswerFields = z.object({
  sectionId: objectIdString,
  questionId: objectIdString,
  textValue: z.string().min(1, "answer is required"),
  selectedOption: z.string(),
  selectedOptions: z.array(z.string()),
  scaleValue: z.number(),
  // tableAnswers: z.array(z.object({row: z.string(), value: z.string() | z.array(z.string())})) will fix later
  dateValue: z.iso.date(),
  timeValue: z.iso.time(),
});

export const inputInstance = z.object({
  filledBy: objectIdString,
  type: z.enum(QuestionTypes),
  status: z.enum(InstanceStatus).default(InstanceStatus.Draft),
  answers: [baseAnswerFields],
  submittedAt: z.iso.date().optional(),
});

export const answerSchema = z
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
  .and(baseAnswerFields);

export interface ITableAnswer {
  row: string;
  value: string | string[]; // string for RADIO_TABLE, string[] for CHECKBOX_TABLE
}

export interface IAnswer {
  questionId: MongoObjectId;
  sectionId: MongoObjectId;

  // Single value answers
  textValue?: string; // SHORT_TEXT, PARAGRAPH
  selectedOption?: string; // RADIO, DROPDOWN
  selectedOptions?: string[]; // CHECKBOX
  scaleValue?: number; // LINEAR_SCALE
  dateValue?: Date; // DATE
  timeValue?: string; // TIME
  // Table answers
  tableAnswers?: ITableAnswer[];
}

export interface IInstance {
  _id: MongoObjectId;
  schemaId: MongoObjectId;
  filledBy: MongoObjectId;
  status: InstanceStatus;
  answers: IAnswer[];
  submittedAt?: Date;
}
