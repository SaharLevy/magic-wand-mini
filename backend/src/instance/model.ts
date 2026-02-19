import mongoose, { Schema, Types } from "mongoose";
import {
  type IInstance,
  type IAnswer,
  InstanceStatus,
  IText,
  IScale,
  IOption,
  IOptions,
  IDate,
  ITime,
  IRadioTable,
  ICheckboxTable,
} from "./types.js";
import { QuestionTypes } from "../shared/types.js";
import config from "../utils/config.js";

const textSchema = new Schema<IText>({
  text: { type: String, required: true },
});

const scaleSchema = new Schema<IScale>({
  scaleNumber: { type: Number, required: true },
});

const optionSchema = new Schema<IOption>({
  option: { type: String, required: true },
});

const optionsSchema = new Schema<IOptions>({
  options: { type: [String], default: [] },
});

const radioTableSchema = new Schema<IRadioTable>({
  tableAnswers: [
    {
      row: { type: Number, required: true },
      column: { type: Number, required: true },
      _id: false,
    },
  ],
});

const checkboxTableSchema = new Schema<ICheckboxTable>({
  tableAnswers: [
    {
      row: { type: Number, required: true },
      columns: { type: [Number], default: [] },
      _id: false,
    },
  ],
});

const dateSchema = new Schema<IDate>({
  date: { type: Date },
});

const timeSchema = new Schema<ITime>({
  time: { type: String },
});

const baseAnswerSchema = new Schema<IAnswer>(
  {
    type: { type: String, enum: Object.values(QuestionTypes), required: true },
  },
  {
    discriminatorKey: config.INSTANCE_DISCRIMINATOR_KEY,
  },
);

baseAnswerSchema.discriminator(QuestionTypes.SHORT_TEXT, textSchema);
baseAnswerSchema.discriminator(QuestionTypes.PARAGRAPH, textSchema);
baseAnswerSchema.discriminator(QuestionTypes.LINEAR_SCALE, scaleSchema);
baseAnswerSchema.discriminator(QuestionTypes.RADIO, optionSchema);
baseAnswerSchema.discriminator(QuestionTypes.DROPDOWN, optionSchema);
baseAnswerSchema.discriminator(QuestionTypes.CHECKBOX, optionsSchema);
baseAnswerSchema.discriminator(
  QuestionTypes.CHECKBOX_TABLE,
  checkboxTableSchema,
);
baseAnswerSchema.discriminator(QuestionTypes.RADIO_TABLE, radioTableSchema);
baseAnswerSchema.discriminator(QuestionTypes.DATE, dateSchema);
baseAnswerSchema.discriminator(QuestionTypes.TIME, timeSchema);

const instanceSchema = new Schema<IInstance>({
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
    type: [baseAnswerSchema],
    default: [],
  },
  submittedAt: {
    type: Date,
  },
});

export const Instance = mongoose.model<IInstance>("Instance", instanceSchema);
