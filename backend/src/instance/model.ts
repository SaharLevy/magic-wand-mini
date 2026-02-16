import mongoose, { Schema, SchemaDefinition, Types } from "mongoose";
import { type IInstance, type IAnswer, InstanceStatus } from "./types.js";
import { QuestionTypes } from "../shared/types.js";
import config from "../utils/config.js";

const createAnswerSchema = <T>(definition: SchemaDefinition<T>) => {
  return new Schema(definition, { _id: false });
};

const textSchema = createAnswerSchema({
  text: { type: String, required: true },
});

const scaleSchema = createAnswerSchema({
  scaleNumber: { type: Number, required: true },
});

const optionSchema = createAnswerSchema({
  option: { type: String, required: true },
});

const optionsSchema = createAnswerSchema({
  options: { type: [String], default: [] },
});

const tableAnswerSchema = createAnswerSchema({
  rows: { type: [String], default: [] },
  values: { type: Schema.Types.Mixed, of: [String, [String]], default: [] },
});

const dateSchema = createAnswerSchema({
  date: { type: Date },
});

const timeSchema = createAnswerSchema({
  time: { type: String },
});

const baseAnswerSchema = new Schema<IAnswer>(
  {
    type: { type: String, enum: Object.values(QuestionTypes), required: true },
  },
  {
    discriminatorKey: config.INSTANCE_DISCRIMINATOR_KEY,
    _id: false,
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
