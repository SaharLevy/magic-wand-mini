import z from "zod";
import { objectIdString } from "../shared/types.js";
import {
  instanceSchema,
  updateAnswerSchema,
  updateAnswerSchemaWithIds,
  updateInstanceStatusSchema,
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
  updateInstanceStatus: {
    params: z
      .object({
        id: objectIdString,
      })
      .strict(),
    body: updateInstanceStatusSchema,
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
};

export default instanceValidation;
