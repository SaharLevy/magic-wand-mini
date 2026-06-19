import { schemaWithIdSchema } from "../schema/types.js";
import {
  MongoObjectId,
  objectIdString,
  QuestionTypes,
} from "../shared/types.js";
import z from "zod";

export enum InstanceStatus {
  Draft = "Draft",
  Published = "Published",
}

export const optionShape = z.object({
  option: z.string(),
});

export const optionsShape = z.object({
  options: z.array(z.string()),
});

export const scaleShape = z.object({
  scaleNumber: z.number().int(),
});

export const textShape = z.object({
  text: z.string(),
});

//Specific Question Schemas

export const shortTextAnswer = z.object({
  type: z.literal(QuestionTypes.SHORT_TEXT),
  ...textShape.shape,
});

export const paragraphAnswer = z.object({
  type: z.literal(QuestionTypes.PARAGRAPH),
  ...textShape.shape,
});

export const radioAnswer = z.object({
  type: z.literal(QuestionTypes.RADIO),
  ...optionShape.shape,
  otherText: z.string().optional(),
});

export const checkboxAnswer = z.object({
  type: z.literal(QuestionTypes.CHECKBOX),
  ...optionsShape.shape,
  otherText: z.string().optional(),
});

export const dropdownAnswer = z.object({
  type: z.literal(QuestionTypes.DROPDOWN),
  ...optionShape.shape,
});

export const linearScaleAnswer = z.object({
  type: z.literal(QuestionTypes.LINEAR_SCALE),
  ...scaleShape.shape,
});

export const radioTableAnswer = z.object({
  type: z.literal(QuestionTypes.RADIO_TABLE),
  tableAnswers: z.array(
    z.object({
      row: z.number(),
      column: z.number(),
    }),
  ),
});

export const checkboxTableAnswer = z.object({
  type: z.literal(QuestionTypes.CHECKBOX_TABLE),
  tableAnswers: z.array(
    z.object({
      row: z.number(),
      columns: z.array(z.number()),
    }),
  ),
});

export const dateAnswer = z.object({
  type: z.literal(QuestionTypes.DATE),
  date: z.iso.date().optional(),
});

export const timeAnswer = z.object({
  type: z.literal(QuestionTypes.TIME),
  time: z.iso.time().optional(),
});

export const baseAnswerFields = z.object({
  questionId: objectIdString,
});

export const answerSchema = z
  .discriminatedUnion("type", [
    shortTextAnswer,
    paragraphAnswer,
    radioAnswer,
    checkboxAnswer,
    dropdownAnswer,
    linearScaleAnswer,
    radioTableAnswer,
    checkboxTableAnswer,
    dateAnswer,
    timeAnswer,
  ])
  .and(baseAnswerFields);

export const updateAnswerSchema = answerSchema.optional();

export const sectionAnswerSchema = z.object({
  sectionId: objectIdString,
  answers: answerSchema.array().default([]),
});

export const instanceSchema = z.object({
  schemaId: objectIdString,
  filledBy: objectIdString,
  status: z.enum(InstanceStatus).default(InstanceStatus.Draft),
  sections: sectionAnswerSchema.array().default([]),
  submittedAt: z.iso.date().optional(),
});

export const answerIdSchema = z.object({
  sectionId: objectIdString,
  answerId: objectIdString,
});

export const createInstanceSchema = z.object({
  filledBy: objectIdString,
});

export const instanceWithSchema = instanceSchema.extend({
  _id: objectIdString,
  schemaId: schemaWithIdSchema,
});

export const schemaTitleSchema = schemaWithIdSchema.pick({
  _id: true,
  title: true,
});

export const instanceWithSchemaTitle = instanceSchema.extend({
  _id: objectIdString,
  schemaId: schemaTitleSchema,
});

export const updateAnswerSchemaWithIds = z.intersection(
  answerIdSchema,
  updateAnswerSchema,
);

export const statusesSchema = z.object({
  statuses: z.array(z.enum(InstanceStatus)),
});

// new logic section
export type ISectionAnswer = z.infer<typeof sectionAnswerSchema>;

export type IInstanceInput = z.infer<typeof instanceSchema>;
export type IInstance = IInstanceInput & { _id: MongoObjectId };
export type IAnswer = z.infer<typeof answerSchema>;
export type IAnswerUpdate = Partial<IAnswer>;
export type IAnswerUpdateWithIds = z.infer<typeof updateAnswerSchemaWithIds>;
export type IInstancePopulated = z.infer<typeof instanceWithSchema>;
export type IInstanceWithSchemaTitle = z.infer<typeof instanceWithSchemaTitle>;

// Answers types

export type IText = Omit<z.infer<typeof shortTextAnswer>, "type">;
export type IScale = Omit<z.infer<typeof linearScaleAnswer>, "type">;
export type IOption = Omit<z.infer<typeof radioAnswer>, "type">;
export type IOptions = Omit<z.infer<typeof checkboxAnswer>, "type">;
export type IRadioTable = Omit<z.infer<typeof radioTableAnswer>, "type">;
export type ICheckboxTable = Omit<z.infer<typeof checkboxTableAnswer>, "type">;
export type IDate = Omit<z.infer<typeof dateAnswer>, "type">;
export type ITime = Omit<z.infer<typeof timeAnswer>, "type">;
