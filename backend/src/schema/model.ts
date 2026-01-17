import mongoose, { Schema } from "mongoose";
import {
  QuestionTypes,
  SchemaStatuses,
  SchemaScopes,
  type ISchema,
  type ISection,
  type IQuestion,
  type IOption,
  type IValidation,
} from "./types.js";

const optionSchema = new Schema<IOption>(
  {
    optionId: { type: String, required: true },
    text: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const validationSchema = new Schema<IValidation>(
  {
    minLength: { type: Number },
    maxLength: { type: Number },
    pattern: { type: String },
  },
  { _id: false }
);

const questionSchema = new Schema<IQuestion>(
  {
    questionId: { type: String, required: true },
    type: {
      type: String,
      enum: QuestionTypes,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    required: { type: Boolean, default: false },
    order: { type: Number, required: true },
    options: { type: [optionSchema] },
    scaleMin: { type: Number },
    scaleMax: { type: Number },
    scaleMinLabel: { type: String },
    scaleMaxLabel: { type: String },
    rows: { type: [String] },
    columns: { type: [String] },
    validation: { type: validationSchema },
  },
  { _id: false }
);

const sectionSchema = new Schema<ISection>(
  {
    sectionId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    questions: { type: [questionSchema], default: [] },
  },
  { _id: false }
);

const formSchemaDefinition = new Schema<ISchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    baseSchemaId: {
      type: Schema.Types.ObjectId,
      ref: "FormSchema",
      default: null,
    },
    status: {
      type: String,
      enum: SchemaStatuses,
      default: "Draft",
    },
    scope: {
      type: String,
      enum: SchemaScopes,
      default: "Private",
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
  },
  {
    timestamps: true,
  }
);

export const FormSchema = mongoose.model<ISchema>("FormSchema", formSchemaDefinition);