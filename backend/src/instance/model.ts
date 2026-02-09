import mongoose, { Schema, Types } from "mongoose";

import {
  type IInstance,
  type IAnswer,
  type ITableAnswer,
  InstanceStatus,
} from "./types.js";
import { QuestionTypes } from "../shared/types.js";

const tableAnswerSchema = new Schema<ITableAnswer>({
  row: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }, // string | string[]
});

const baseAnswerSchema = new Schema<IAnswer>({
  questionId: { type: Types.ObjectId, required: true },
  sectionId: { type: Types.ObjectId, required: true },
  type: { type: String, enum: Object.values(QuestionTypes), required: true },

  // textValue: { type: String },
  // selectedOption: { type: String },
  // selectedOptions: { type: [String] },
  // scaleValue: { type: Number },
  // dateValue: { type: Date },
  // timeValue: { type: String },
  // tableAnswers: { type: [tableAnswerSchema] },
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
});

export const Instance = mongoose.model<IInstance>("Instance", instanceSchema);
