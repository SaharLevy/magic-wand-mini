import { Router } from "express";
import validate from "../utils/asyncHandler.js";
import instanceValidation from "./validation.js";
import { StatusCodes } from "http-status-codes";
import Manager from "./manager.js";

const instanceRouter = Router();

instanceRouter.get(
  "/instances/:id",
  validate(instanceValidation.myInstances, async (req, res) => {
    res.status(StatusCodes.OK).json(await Manager.instancesById(req.params.id));
  }),
);

instanceRouter.get(
  "/drafts/:id",
  validate(instanceValidation.myDrafts, async (req, res) => {
    res.status(StatusCodes.OK).json(await Manager.myDrafts(req.params.id));
  }),
);

instanceRouter.get(
  "/:id",
  validate(instanceValidation.getInstanceById, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.getInstanceById(req.params.id));
  }),
);

instanceRouter.post(
  "/",
  validate(instanceValidation.createInstance, async (req, res) => {
    res
      .status(StatusCodes.CREATED)
      .json(await Manager.createInstance(req.body));
  }),
);

export default instanceRouter;
