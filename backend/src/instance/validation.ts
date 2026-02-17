import z from "zod";
import { objectIdString } from "../shared/types.js";
import {
  answerIdSchema,
  instanceSchema,
  updateAnswerSchemaWithIds,
} from "./types.js";

const instanceValidation = {
  myInstances: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
  createInstance: {
    params: z.object({}),
    body: instanceSchema,
    query: z.object({}),
  },
  myDrafts: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: z.object({}),
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
