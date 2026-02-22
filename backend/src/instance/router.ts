import { Router } from "express";
import validate from "../utils/asyncHandler.js";
import instanceValidation from "./validation.js";
import { StatusCodes } from "http-status-codes";
import Manager from "./manager.js";

const instanceRouter = Router();

instanceRouter.get(
  "/:userId/instances",
  validate(instanceValidation.getInstancesByUserId, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.getInstancesByUserId(
          req.params.userId,
          req.query.statuses,
        ),
      );
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
  "/:schemaId",
  validate(instanceValidation.createInstance, async (req, res) => {
    const { sectionId, questionId, ...newInstance } = req.body;

    res
      .status(StatusCodes.CREATED)
      .json(
        await Manager.createInstance(
          req.params.schemaId,
          sectionId,
          questionId,
          newInstance,
        ),
      );
  }),
);

instanceRouter.patch(
  "/:id/status",
  validate(instanceValidation.publishInstance, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.publishInstance(req.params.id));
  }),
);

instanceRouter.patch(
  "/:id/answer",
  validate(instanceValidation.updateAnswer, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.updateAnswer(req.params.id, req.body));
  }),

  instanceRouter.delete(
    "/:id",
    validate(instanceValidation.deleteAnswer, async (req, res) => {
      res
        .status(StatusCodes.OK)
        .json(await Manager.deleteAnswer(req.params.id, req.body.answerId));
    }),
  ),
);

export default instanceRouter;
