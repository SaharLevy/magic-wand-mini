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
};

export default schemasValidation;
