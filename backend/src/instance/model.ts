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
  ISectionAnswer,
} from "./types.js";
import { QuestionTypes } from "../shared/types.js";
import config from "../utils/config.js";

const textSchema = new Schema<IText>({
  text: { type: String },
});

const scaleSchema = new Schema<IScale>({
  scaleNumber: { type: Number },
});

const optionSchema = new Schema<IOption>({
  option: { type: String },
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
    questionId: { type: Types.ObjectId, required: true },
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

const sectionSchema = new Schema<ISectionAnswer>(
  {
    sectionId: { type: Types.ObjectId, required: true },
    answers: { type: [baseAnswerSchema], default: [] },
  },
  { _id: false },
);

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
  sections: {
    type: [sectionSchema],
    default: [],
  },
  submittedAt: {
    type: Date,
  },
});

export const Instance = mongoose.model<IInstance>("Instance", instanceSchema);
