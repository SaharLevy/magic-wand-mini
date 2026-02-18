import z from "zod";
import { objectIdString } from "../shared/types.js";
import {
  answerIdSchema,
  instanceSchema,
  statusesSchema,
  updateAnswerSchemaWithIds,
} from "./types.js";

const instanceValidation = {
  getInstancesByUserId: {
    params: z
      .object({
        userId: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: statusesSchema,
  },
  createInstance: {
    params: z.object({}),
    body: instanceSchema,
    query: z.object({}),
  },
  getInstanceById: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  publishInstance: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  updateAnswer: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: updateAnswerSchemaWithIds,
    query: z.object({}),
  },
  deleteAnswer: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: answerIdSchema,
    query: z.object({}),
  },
};

export default instanceValidation;
