import { z } from "zod";

const schemasValidation = {
  getSchemas: {
    params: z.object({}),
    body: z.object({}),
    query: z.object({}),
  },
  getSchemasStatusDraft: {
    params: z.object({}),
    body: z.object({}),
    query: z.object({}),
  },
  getSchemaById: {
    params: z
      .object({
        id: z.hex().length(24, "Invalid MongoDB ObjectId"),
      })
      .strict(),
    body: z.object({}),
    query: z.object({}),
  },
};

export default schemasValidation;
