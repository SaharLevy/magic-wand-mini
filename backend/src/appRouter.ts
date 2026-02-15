import { Router } from "express";
import schemasRouter from "./schema/router.js";
import instanceRouter from "./instance/router.js"

const appRouter = Router();

appRouter.use("/schemas", schemasRouter);
appRouter.use("/instance", instanceRouter)

export default appRouter;
