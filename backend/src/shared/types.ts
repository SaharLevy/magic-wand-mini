import { Types } from "mongoose";
import z from "zod";

export const objectIdString = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), { message: "Invalid ObjectId" })
  .transform((val) => new Types.ObjectId(val));

export type MongoObjectId = z.infer<typeof objectIdString>;

export enum QuestionTypes {
  SHORT_TEXT = "SHORT_TEXT",
  PARAGRAPH = "PARAGRAPH",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  LINEAR_SCALE = "LINEAR_SCALE",
  RADIO_TABLE = "RADIO_TABLE",
  CHECKBOX_TABLE = "CHECKBOX_TABLE",
  DATE = "DATE",
  TIME = "TIME",
}

export const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  order: z.number().int().min(0),
});

//Specific Questions Schemas

export const optionsShape = z.object({
  options: z.array(optionSchema),
});

export const scaleShape = z.object({
  scaleMin: z.number().int(),
  scaleMax: z.number().int(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
});

export const tableShape = z.object({
  rows: z.array(z.string()),
  columns: z.array(z.string()),
});

//Specific Question Schemas

export const shortTextSchema = z.object({
  type: z.literal(QuestionTypes.SHORT_TEXT),
});

export const paragraphSchema = z.object({
  type: z.literal(QuestionTypes.PARAGRAPH),
});

export const radioSchema = z.object({
  type: z.literal(QuestionTypes.RADIO),
  ...optionsShape.shape,
});

export const checkboxSchema = z.object({
  type: z.literal(QuestionTypes.CHECKBOX),
  ...optionsShape.shape,
});

export const dropdownSchema = z.object({
  type: z.literal(QuestionTypes.DROPDOWN),
  ...optionsShape.shape,
});

export const linearScaleSchema = z.object({
  type: z.literal(QuestionTypes.LINEAR_SCALE),
  ...scaleShape.shape,
});

export const radioTableSchema = z.object({
  type: z.literal(QuestionTypes.RADIO_TABLE),
  ...tableShape.shape,
});

export const checkboxTableSchema = z.object({
  type: z.literal(QuestionTypes.CHECKBOX_TABLE),
  ...tableShape.shape,
});

export const dateSchema = z.object({
  type: z.literal(QuestionTypes.DATE),
  date: z.iso.date().optional(),
});

export const timeSchema = z.object({
  type: z.literal(QuestionTypes.TIME),
  time: z.iso.time().optional(),
});
