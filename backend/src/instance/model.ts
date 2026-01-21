import mongoose, { Schema } from "mongoose";
import {
  InstanceStatuses,
  type IInstance,
  type IAnswer,
  type ITableAnswer,
} from "./types.js";

const tableAnswerSchema = new Schema<ITableAnswer>(
  {
    row: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }, // string | string[]
  },
  { _id: false }
);

const answerSchema = new Schema<IAnswer>(
  {
    questionId: { type: String, required: true },
    sectionId: { type: String, required: true },
    textValue: { type: String },
    selectedOption: { type: String },
    selectedOptions: { type: [String] },
    scaleValue: { type: Number },
    dateValue: { type: Date },
    timeValue: { type: String },
    tableAnswers: { type: [tableAnswerSchema] },
  });

const instanceSchema = new Schema<IInstance>(
  {
    schemaId: {
      type: Schema.Types.ObjectId,
      ref: "FormSchema",
      required: true,
    },
    filledBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: InstanceStatuses,
      default: "Draft",
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    currentSectionIndex: {
      type: Number,
      default: 0,
    },
  },
);

export const Instance = mongoose.model<IInstance>("Instance", instanceSchema);