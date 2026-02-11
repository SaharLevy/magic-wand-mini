import { Router } from "express";
import validate from "../utils/asyncHandler.js";
import instanceValidation from "./validation.js";
import { StatusCodes } from "http-status-codes";
import Manager from "./manager.js";

const instanceRouter = Router();

instanceRouter.get(
  "/",
  validate(instanceValidation.myInstances, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.myInstances(req.params.userId));
  }),
);
