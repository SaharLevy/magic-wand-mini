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

export const updateInstanceStatusSchema = z.object({
  status: z.enum(InstanceStatus).optional(),
});

export const optionShape = z.object({
  option: z.string(),
});

export const optionsShape = z.object({
  options: z.array(z.string()),
});

export const scaleShape = z.object({
  scaleNumber: z.number().int(),
});

export const tableShape = z.object({
  tableAnswers: z.array(
    z.object({
      row: z.string(),
      value: z.union([z.string(), z.array(z.string())]),
    }),
  ),
});

export const textShape = z.object({
  text: z.string().min(1, "answer text is required"),
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
});

export const checkboxAnswer = z.object({
  type: z.literal(QuestionTypes.CHECKBOX),
  ...optionsShape.shape,
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
  ...tableShape.shape,
});

export const checkboxTableAnswer = z.object({
  type: z.literal(QuestionTypes.CHECKBOX_TABLE),
  ...tableShape.shape,
});

export const dateAnswer = z.object({
  type: z.literal(QuestionTypes.DATE),
  date: z.iso.date().optional(),
});

export const timeAnswer = z.object({
  type: z.literal(QuestionTypes.TIME),
  time: z.iso.time().optional(),
});

export const answerSchema = z.discriminatedUnion("type", [
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
]);

export const updateAnswerSchema = answerSchema.optional();

export const instanceSchema = z.object({
  filledBy: objectIdString,
  status: z.enum(InstanceStatus).default(InstanceStatus.Draft),
  answers: answerSchema.array(),
  submittedAt: z.iso.date().optional(),
});

export const answerIdSchema = z.object({
  answerId: objectIdString,
});

export const updateAnswerSchemaWithIds = z.intersection(
  answerIdSchema,
  updateAnswerSchema,
);

export type IInstanceInput = z.infer<typeof instanceSchema>;
export type IInstance = IInstanceInput & { _id: MongoObjectId };
export type IAnswer = z.infer<typeof answerSchema>;

export type IInstanceStatusUpdate = z.infer<typeof updateInstanceStatusSchema>;
export type IAnswerUpdate = Partial<IAnswer>;
export type IAnswerUpdateWithIds = z.infer<typeof updateAnswerSchemaWithIds>;
