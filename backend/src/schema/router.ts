import { Router } from "express";
import Controller from "./controller.js";
import schemasValidation from "./validation.js";
import validate from "../utils/asyncHandler.js";

const schemasRouter = Router();

schemasRouter.get(
  "/",
  validate(schemasValidation.getSchemas, Controller.getSchemas),
);

schemasRouter.get(
  "/getDrafts",
  validate(
    schemasValidation.getSchemasStatusDraft,
    Controller.getSchemasStatusDraft,
  ),
);

schemasRouter.get(
  "/:id",
  validate(schemasValidation.getSchemaById, Controller.getSchemaById),
);

schemasRouter.post(
  "/",
  validate(schemasValidation.createSchema, Controller.createSchema),
);
export default schemasRouter;
