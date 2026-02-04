import mongoose, { Schema } from "mongoose";
import {
  type ISchema,
  type ISection,
  type IQuestion,
  type IOption,
  SchemaStatus,
} from "./types.js";
import config from "../utils/config.js";

const optionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  order: { type: Number, required: true },
});

const baseQuestionSchema = new Schema<IQuestion>(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    required: { type: Boolean, default: false },
    order: { type: Number, required: true },
  },
  {
    discriminatorKey: config.SCHEMA_DISCRIMINATOR_KEY,
  },
);

// const questionSchema = new Schema<IQuestion>({
//   type: { type: String, enum: QuestionTypes, required: true },
//   title: { type: String, required: true },
//   description: { type: String },
//   required: { type: Boolean, default: false },
//   order: { type: Number, required: true },
//   options: { type: [IOptionSchema] },
//   scaleMin: { type: Number },
//   scaleMax: { type: Number },
//   scaleMinLabel: { type: String },
//   scaleMaxLabel: { type: String },
//   rows: { type: [String] },
//   columns: { type: [String] },
// });

const sectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  questions: { type: [baseQuestionSchema], default: [] },
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
    enum: SchemaStatus,
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
