import type { Types } from "mongoose";

export const InstanceStatuses = ["Draft", "Submitted"] as const;
export type InstanceStatus = (typeof InstanceStatuses)[number];

export interface ITableAnswer {
  row: string;
  value: string | string[]; // string for RADIO_TABLE, string[] for CHECKBOX_TABLE
}

export interface IAnswer {
  questionId: string;
  sectionId: string;
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
  _id: Types.ObjectId;
  schemaId: Types.ObjectId;
  schemaVersion: number;
  filledBy: Types.ObjectId;
  status: InstanceStatus;
  answers: IAnswer[];
  currentSectionIndex: number;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
}
