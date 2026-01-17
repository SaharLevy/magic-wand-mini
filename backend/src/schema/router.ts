import { Router } from "express";
import Controller from "./controller.js";
import schemasValidation from "./validation.js";
import validate from "../utils/asyncHandler.js";

const schemasRouter = Router();

schemasRouter.get(
  "/",
  validate(schemasValidation.getSchemas, Controller.getSchemas),
);

export default schemasRouter;
