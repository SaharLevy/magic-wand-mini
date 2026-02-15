import z from "zod";
import { objectIdString } from "../shared/types.js";
import { instanceSchema } from "./types.js";

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
};

export default instanceValidation;
