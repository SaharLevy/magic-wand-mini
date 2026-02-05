import mongoose, { Schema, Types } from "mongoose";

import {
  type IInstance,
  type IAnswer,
  type ITableAnswer,
  InstanceStatus,
} from "./types.js";

const tableAnswerSchema = new Schema<ITableAnswer>({
  row: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }, // string | string[]
});

const answerSchema = new Schema<IAnswer>({
  questionId: { type: Types.ObjectId, required: true },
  sectionId: { type: Types.ObjectId, required: true },
  textValue: { type: String },
  selectedOption: { type: String },
  selectedOptions: { type: [String] },
  scaleValue: { type: Number },
  dateValue: { type: Date },
  timeValue: { type: String },
  tableAnswers: { type: [tableAnswerSchema] },
});

const instanceSchema = new Schema<IInstance>({
  schemaId: {
    type: Types.ObjectId,
    ref: "FormSchema",
    required: true,
  },
  filledBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(InstanceStatus),
    default: InstanceStatus.Draft,
  },
  answers: {
    type: [answerSchema],
    default: [],
  },
  currentSectionIndex: {
    type: Number,
    default: 0,
  },
});

export const Instance = mongoose.model<IInstance>("Instance", instanceSchema);
