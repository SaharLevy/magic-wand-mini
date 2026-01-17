import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

const asyncHandler = <
    SParams extends z.ZodObject<z.ZodRawShape>,
    SBody extends z.ZodObject<z.ZodRawShape>,
    SQuery extends z.ZodObject<z.ZodRawShape>
>(
    schema: {
        params?: SParams;
        body?: SBody;
        query?: SQuery;
    },
    fn: (
        req: Request<
            SParams extends z.ZodObject<z.ZodRawShape> ? z.infer<SParams> : {},
            unknown,
            SBody extends z.ZodObject<z.ZodRawShape> ? z.infer<SBody> : {},
            SQuery extends z.ZodObject<z.ZodRawShape> ? z.infer<SQuery> : {}
        >,
        res: Response,
        next: NextFunction
    ) => Promise<void>
) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (schema.params) schema.params.parse(req.params);

            if (schema.query) schema.query.parse(req.query);

            if (schema.body) req.body = schema.body.parse(req.body === undefined ? {} : req.body);

            type ValidatedRequest = Request<
                SParams extends z.ZodObject<z.ZodRawShape> ? z.infer<SParams> : {},
                unknown,
                SBody extends z.ZodObject<z.ZodRawShape> ? z.infer<SBody> : {},
                SQuery extends z.ZodObject<z.ZodRawShape> ? z.infer<SQuery> : {}
            >;

            await fn(req as ValidatedRequest, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncHandler;