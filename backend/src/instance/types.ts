import type { Types } from "mongoose";
import { MongoObjectId } from "../shared/types.js";

export const InstanceStatuses = ["Draft", "Submitted"] as const;

export enum QuestionTypes {
  SHORT_TEXT = "SHORT_TEXT",
  PARAGRAPH = "PARAGRAPH",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  LINEAR_SCALE = "LINEAR_SCALE",
  RADIO_TABLE = "RADIO_TABLE",
  CHECKBOX_TABLE = "CHECKBOX_TABLE",
  DATE = "DATE",
  TIME = "TIME",
}

export enum InstanceStatus {
  Draft = "Draft",
  Published = "Published",
}

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
  currentSectionIndex: number;
  submittedAt?: Date;
}
