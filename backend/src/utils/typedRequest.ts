import type { Request } from "express";
import type { z } from "zod";

type ValidationSchema = {
  params: z.ZodObject<z.ZodRawShape>;
  body: z.ZodObject<z.ZodRawShape>;
  query: z.ZodObject<z.ZodRawShape>;
};

export type TypedRequest<T extends ValidationSchema> = Request<
  z.infer<T["params"]>,
  unknown,
  z.infer<T["body"]>,
  z.infer<T["query"]>
>;
