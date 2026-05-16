import { z } from "zod";
import { QuestionTypes, objectIdString } from "../shared/types.js";

export enum SchemaStatus {
  Draft = "Draft",
  Published = "Published",
}

export const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  order: z.number().int().min(0),
});

//Specific Shapes Schemas

export const optionsShape = z.object({
  options: z.array(optionSchema),
});

export const scaleShape = z.object({
  scaleMin: z.number().int(),
  scaleMax: z.number().int(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
});

// maybe ill need to change it later on  think!
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

export const baseQuestionFields = z.object({
  title: z.string(),
  description: z.string().optional(),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
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
  title: z.string(),
  description: z.string().optional(),
  order: z.number().int().min(0),
  questions: z.array(questionSchema).default([]),
});

export const schemaInput = z.object({
  title: z.string().default(""),
  description: z.string().optional(),
  status: z.enum(SchemaStatus).default(SchemaStatus.Draft),
  createdBy: objectIdString,
  assignedUsers: z.array(objectIdString).default([]),
  sections: z.array(sectionSchema).default([]),
});

// created this new schema becuase of a problem where im not sending any createdBy atm will check it again later
export const createSchemaBody = z.object({
  title: z.string().default(""),
  description: z.string().optional(),
});

// Output with ids

export const questionWithIdSchema = questionSchema.and(
  z.object({ _id: objectIdString }),
);

export const sectionWithIdSchema = sectionSchema.extend({
  _id: objectIdString,
  questions: z.array(questionWithIdSchema).default([]),
});

export const schemaWithIdSchema = schemaInput.extend({
  _id: objectIdString,
  sections: z.array(sectionWithIdSchema).default([]),
});

// Updates

export const updateSchema = z.object({
  title: z.string().min(1, "Schema title is required").optional(),
  description: z.string().optional(),
  assignedUsers: z.array(objectIdString).optional(),
  status: z.enum(SchemaStatus).optional(),
});

export const updateSectionSchemaWithoutId = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateQuestionsSchemaWithoutIds = questionSchema.optional();

export const questionIdsSchema = z.object({
  sectionId: objectIdString,
  questionId: objectIdString,
});

export const sectionIdSchema = z.object({
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

export const statusesSchema = z.object({
  statuses: z.array(z.enum(SchemaStatus)),
});

// Infer base types
export type IBaseQuestion = z.infer<typeof baseQuestionFields>;
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInput>;
export type ISchema = z.infer<typeof schemaWithIdSchema>;

export type ISchemaUpdate = z.infer<typeof updateSchema>;
export type ISectionUpdate = z.infer<typeof updateSectionSchemaWithoutId>;
export type ISectionUpdateRequest = z.infer<typeof updateSectionSchema>;
export type IQuestionUpdate = Partial<IQuestion>;
export type IQuestionUpdateRequest = z.infer<typeof updateQuestionSchema>;

// Specific question types

export type IText = Omit<z.infer<typeof shortTextSchema>, "type">;
export type IRadio = Omit<z.infer<typeof radioSchema>, "type">;
export type ICheckbox = Omit<z.infer<typeof checkboxSchema>, "type">;
export type IDropdown = Omit<z.infer<typeof dropdownSchema>, "type">;
export type ILinearScale = Omit<z.infer<typeof linearScaleSchema>, "type">;
export type IRadioTable = Omit<z.infer<typeof radioTableSchema>, "type">;
export type ICheckboxTable = Omit<z.infer<typeof checkboxTableSchema>, "type">;
export type IDate = Omit<z.infer<typeof dateSchema>, "type">;
export type ITime = Omit<z.infer<typeof timeSchema>, "type">;
