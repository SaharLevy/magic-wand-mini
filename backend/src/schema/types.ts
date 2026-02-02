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

export const questionSchema = z.object({
  type: z.enum(QuestionTypes),
  title: z.string().min(1, "Question title is required"),
  description: z.string().optional(),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
});

//Questions schemas:

const textQuestionSchema = z.object({});
const scaleQuestionSchema = z.object({
  scaleMin: z.number().int(),
  scaleMax: z.number().int(),
  scaleMinLabel: z.string(),
  scaleMaxLabel: z.string(),
});
const tableQuestionSchema = z.object({
  rows: z.array(z.string()),
  columns: z.array(z.string()),
});
const optionsQuestionSchema = z.object({
  options: z.array(optionSchema),
});
const dateQuestionSchema = z.object({
  date: z.iso.date(),
});
const timeQuestionSchema = z.object({
  time: z.iso.time(),
});

export const questionsSchema = z.discriminatedUnion("questionType", [
  z.object({ questionType: z.literal(QuestionTypes.SHORT_TEXT) }),
  z.object({ questionType: z.literal(QuestionTypes.PARAGRAPH) }),
  z.object({
    questionType: z.literal(QuestionTypes.LINEAR_SCALE),
    scaleQuestionSchema,
  }),
  z.object({
    questionType: z.literal(QuestionTypes.CHECKBOX_TABLE),
    tableQuestionSchema,
  }),
  z.object({
    questionType: z.literal(QuestionTypes.RADIO_TABLE),
    tableQuestionSchema,
  }),
  z.object({
    questionType: z.literal(QuestionTypes.CHECKBOX),
    optionsQuestionSchema,
  }),
  z.object({
    questionType: z.literal(QuestionTypes.RADIO),
    optionsQuestionSchema,
  }),
  z.object({
    questionType: z.literal(QuestionTypes.DROPDOWN),
    optionsQuestionSchema,
  }),
  z.object({ questionType: z.literal(QuestionTypes.TIME), timeQuestionSchema }),
  z.object({ questionType: z.literal(QuestionTypes.DATE), dateQuestionSchema }),
]);

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

export const questionUpdateSchema = z.object({
  type: z.enum(QuestionTypes).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  options: z.array(optionSchema).optional(),
  scaleMin: z.number().int().optional(),
  scaleMax: z.number().int().optional(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
  rows: z.array(z.string()).optional(),
  columns: z.array(z.string()).optional(),
});

export type QuestionType = (typeof QuestionTypes)[number];
export type MongoObjectId = z.infer<typeof objectIdString>;

// Infer base types
export type IOption = z.infer<typeof optionSchema>;
export type IQuestion = z.infer<typeof questionSchema>;
export type ISection = z.infer<typeof sectionSchema>;
export type ISchemaInput = z.infer<typeof schemaInput>;

export type ISchema = ISchemaInput & { _id: MongoObjectId };

export type ISchemaUpdate = z.infer<typeof schemaUpdateSchema>;
export type ISectionUpdate = z.infer<typeof sectionUpdateSchema>;
export type IQuestionUpdate = z.infer<typeof questionUpdateSchema>;

export interface IQuestionUpdateRequest extends IQuestionUpdate {
  sectionId: MongoObjectId;
  questionId: MongoObjectId;
}

export interface ISectionUpdateRequest extends ISectionUpdate {
  sectionId: MongoObjectId;
}
