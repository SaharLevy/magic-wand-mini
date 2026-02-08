import { z } from "zod";
import { MongoObjectId, objectIdString } from "../shared/types.js";

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

const optionsShape = z.object({
  options: z.array(optionSchema),
});

const scaleShape = z.object({
  scaleMin: z.number().int(),
  scaleMax: z.number().int(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
});

const tableShape = z.object({
  rows: z.array(z.string()),
  columns: z.array(z.string()),
});

//Specific Question Schemas

const shortTextSchema = z.object({
  type: z.literal(QuestionTypes.SHORT_TEXT),
});

const paragraphSchema = z.object({
  type: z.literal(QuestionTypes.PARAGRAPH),
});

const radioSchema = z.object({
  type: z.literal(QuestionTypes.RADIO),
  ...optionsShape.shape,
});

const checkboxSchema = z.object({
  type: z.literal(QuestionTypes.CHECKBOX),
  ...optionsShape.shape,
});

const dropdownSchema = z.object({
  type: z.literal(QuestionTypes.DROPDOWN),
  ...optionsShape.shape,
});

const linearScaleSchema = z.object({
  type: z.literal(QuestionTypes.LINEAR_SCALE),
  ...scaleShape.shape,
});

const radioTableSchema = z.object({
  type: z.literal(QuestionTypes.RADIO_TABLE),
  ...tableShape.shape,
});

const checkboxTableSchema = z.object({
  type: z.literal(QuestionTypes.CHECKBOX_TABLE),
  ...tableShape.shape,
});

const dateSchema = z.object({
  type: z.literal(QuestionTypes.DATE),
  date: z.iso.date().optional(),
});

const timeSchema = z.object({
  type: z.literal(QuestionTypes.TIME),
  time: z.iso.time().optional(),
});

export const questionSchema = z
  .discriminatedUnion("type", [
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
  ])
  .and(baseQuestionFields);

export const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().optional(),
  order: z.number().int().min(0),
  questions: z.array(questionSchema).default([]),
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

export const updateSchema = z.object({
  title: z.string().min(1, "Schema title is required").optional(),
  description: z.string().optional(),
  assignedUsers: z.array(objectIdString).optional(),
  status: z.enum(SchemaStatus).optional(),
});

export const updateSectionSchemaWithoutId = z.object({
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
  updateSectionSchemaWithoutId,
);

export const updateQuestionSchema = z.intersection(
  questionIdsSchema,
  updateQuestionsSchemaWithoutIds,
);

// Infer base types
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInput>;
export type ISchema = ISchemaInput & { _id: MongoObjectId };

export type ISchemaUpdate = z.infer<typeof updateSchema>;
export type ISectionUpdate = z.infer<typeof updateSectionSchemaWithoutId>;
export type ISectionUpdateRequest = z.infer<typeof updateSectionSchema>;
export type IQuestionUpdate = Partial<IQuestion>;
export type IQuestionUpdateRequest = z.infer<typeof updateQuestionSchema>;
