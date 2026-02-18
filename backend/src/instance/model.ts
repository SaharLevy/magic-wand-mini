import mongoose, { Schema, Types } from "mongoose";
import { type IInstance, type IAnswer, InstanceStatus } from "./types.js";
import { QuestionTypes } from "../shared/types.js";
import config from "../utils/config.js";

const textSchema = new Schema({ text: { type: String, required: true } });

const scaleSchema = new Schema({
  scaleNumber: { type: Number, required: true },
});

const optionSchema = new Schema({
  option: { type: String, required: true },
});

const optionsSchema = new Schema({
  options: { type: [String], default: [] },
});

const tableAnswerSchema = new Schema({
  rows: { type: Number, default: [] },
  columns: { type: [Number], default: [] },
});

const dateSchema = new Schema({
  date: { type: Date },
});

const timeSchema = new Schema({
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
baseAnswerSchema.discriminator(QuestionTypes.CHECKBOX_TABLE, tableAnswerSchema);
baseAnswerSchema.discriminator(QuestionTypes.RADIO_TABLE, tableAnswerSchema);
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
