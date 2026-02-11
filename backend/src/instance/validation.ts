import z from "zod";
import { objectIdString } from "../shared/types.js";

const instanceValidation = {
  myInstances: {
    params: z.object({userId: objectIdString}),
    body: z.object({}),
    query: z.object({}),
  },
};

export default instanceValidation;
