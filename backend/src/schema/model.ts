import mongoose, { Schema } from "mongoose";
import {
  type ISchema,
  type ISection,
  type IQuestion,
  type IOption,
  SchemaStatus,
  QuestionTypes,
} from "./types.js";
import config from "../utils/config.js";

const textSchema = new Schema({});

const scaleSchema = new Schema({
  scaleMin: { type: Number, required: true },
  scaleMax: { type: Number, required: true },
  scaleMinLabel: { type: String },
  scaleMaxLabel: { type: String },
});

const dateSchema = new Schema({
  date: { type: String },
});

const timeSchema = new Schema({
  time: { type: String },
});

const optionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  order: { type: Number, required: true },
});

const selectionShapeSchema = new Schema({
  options: { type: [optionSchema], default: [] },
});

const tableSchemaShape = new Schema({
  rows: { type: [String], default: [] },
  columns: { type: [String], default: [] },
});

const baseQuestionSchema = new Schema<IQuestion>(
  {
    type: { type: String, enum: Object.values(QuestionTypes), required: true },
    title: { type: String, required: true },
    description: { type: String },
    required: { type: Boolean, default: false },
    order: { type: Number, required: true },
  },
  {
    discriminatorKey: config.SCHEMA_DISCRIMINATOR_KEY,
  },
);

baseQuestionSchema.discriminator(QuestionTypes.SHORT_TEXT, textSchema);
baseQuestionSchema.discriminator(QuestionTypes.PARAGRAPH, textSchema);
baseQuestionSchema.discriminator(QuestionTypes.RADIO, selectionShapeSchema);
baseQuestionSchema.discriminator(QuestionTypes.CHECKBOX, selectionShapeSchema);
baseQuestionSchema.discriminator(QuestionTypes.DROPDOWN, selectionShapeSchema);
baseQuestionSchema.discriminator(QuestionTypes.LINEAR_SCALE, scaleSchema);
baseQuestionSchema.discriminator(QuestionTypes.RADIO_TABLE, tableSchemaShape);
baseQuestionSchema.discriminator(
  QuestionTypes.CHECKBOX_TABLE,
  tableSchemaShape,
);
baseQuestionSchema.discriminator(QuestionTypes.DATE, dateSchema);
baseQuestionSchema.discriminator(QuestionTypes.TIME, timeSchema);

const sectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  questions: [baseQuestionSchema],
});

const formSchemaDefinition = new Schema<ISchema>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(SchemaStatus),
    default: SchemaStatus.Draft,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sections: {
    type: [sectionSchema],
    default: [],
  },
});

export const FormSchema = mongoose.model<ISchema>(
  "FormSchema",
  formSchemaDefinition,
);
