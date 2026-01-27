import { Router } from "express";
import schemasRouter from "./schema/router.js";

const appRouter = Router();

appRouter.use("/schemas", schemasRouter);

export default appRouter;
