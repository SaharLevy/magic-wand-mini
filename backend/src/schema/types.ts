import { Types } from "mongoose";
import { z } from "zod";

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

export enum SchemaStatus {
  Draft = "Draft",
  Published = "Published",
}

export const objectIdString = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), { message: "Invalid ObjectId" })
  .transform((val) => new Types.ObjectId(val));

export const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  order: z.number().int().min(0),
});

export const baseQuestionFields = z.object({
  title: z.string().min(1, "Question title is required"),
  description: z.string().optional(),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
});

//Specific Questions Schemas

const optionsShape = {
  options: z.array(optionSchema),
};

const scaleShape = {
  scaleMin: z.number().int(),
  scaleMax: z.number().int(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
};

const tableShape = {
  rows: z.array(z.string()),
  columns: z.array(z.string()),
};

//Specific Question Schemas

const shortTextSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.SHORT_TEXT),
});

const paragraphSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.PARAGRAPH),
});

const radioSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.RADIO),
  ...optionsShape,
});

const checkboxSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.CHECKBOX),
  ...optionsShape,
});

const dropdownSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.DROPDOWN),
  ...optionsShape,
});

const linearScaleSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.LINEAR_SCALE),
  ...scaleShape,
});

const radioTableSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.RADIO_TABLE),
  ...tableShape,
});

const checkboxTableSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.CHECKBOX_TABLE),
  ...tableShape,
});

const dateSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.DATE),
  date: z.iso.date().optional(),
});

const timeSchema = baseQuestionFields.extend({
  type: z.literal(QuestionTypes.TIME),
  time: z.iso.time().optional(),
});

export const questionsSchema = z.discriminatedUnion("type", [
  shortTextSchema,
  paragraphSchema,
  radioSchema,
  checkboxSchema,
  dropdownSchema,
  linearScaleSchema,
  radioTableSchema,
  checkboxTableSchema,
  dateSchema,
  timeSchema,
]);

export const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
  order: z.number().int().min(0),
  questions: z.array(questionsSchema).default([]),
});

export const schemaInput = z.object({
  title: z.string().min(1, "Schema title is required"),
  description: z.string().optional(),
  status: z.enum(SchemaStatus).default(SchemaStatus.Draft),
  createdBy: objectIdString,
  assignedUsers: z.array(objectIdString).default([]),
  sections: z.array(sectionSchema).default([]),
});

// Updates

export const schemaUpdateSchema = z.object({
  title: z.string().min(1, "Schema title is required").optional(),
  description: z.string().optional(),
  assignedUsers: z.array(objectIdString).optional(),
});

export const sectionUpdateSchema = z.object({
  title: z.string().min(1, "Section title is required").optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateQuestionsSchemaWithoutIds = z.discriminatedUnion("type", [
  shortTextSchema.partial(),
  paragraphSchema.partial(),
  radioSchema.partial(),
  checkboxSchema.partial(),
  dropdownSchema.partial(),
  linearScaleSchema.partial(),
  radioTableSchema.partial(),
  checkboxTableSchema.partial(),
  dateSchema.partial(),
  timeSchema.partial(),
]);

const questionIdsSchema = z.object({
  sectionId: objectIdString,
  questionId: objectIdString,
});

const sectionIdSchema = z.object({
  sectionId: objectIdString,
});

export const updateSectionSchema = z.intersection(
  sectionIdSchema,
  sectionUpdateSchema,
);

export const updateQuestionSchema = z.intersection(
  questionIdsSchema,
  updateQuestionsSchemaWithoutIds,
);

// Infer base types
export type MongoObjectId = z.infer<typeof objectIdString>;
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionsSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInput>;
export type ISchema = ISchemaInput & { _id: MongoObjectId };

export type ISchemaUpdate = z.infer<typeof schemaUpdateSchema>;
export type ISectionUpdate = z.infer<typeof sectionUpdateSchema>;
export type ISectionUpdateRequest = z.infer<typeof updateSectionSchema>;
export type IQuestionUpdate = Partial<IQuestion>;
export type IQuestionUpdateRequest = z.infer<typeof updateQuestionSchema>;
