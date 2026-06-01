import { Router } from "express";
import schemasValidation from "./validation.js";
import validate from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import Manager from "./manager.js";

const schemasRouter = Router();

schemasRouter.get(
  "/:userId/getSchemas",
  validate(schemasValidation.getSchemasByUserId, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.getSchemasByUserId(req.params.userId));
  }),
);

schemasRouter.get(
  "/:schemaId",
  validate(schemasValidation.getSchemaById, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.getSchemaById(req.params.schemaId));
  }),
);

schemasRouter.post(
  "/:userId",
  validate(schemasValidation.createSchema, async (req, res) => {
    res
      .status(StatusCodes.CREATED)
      .json(await Manager.createSchema(req.params.userId, req.body.title));
  }),
);

schemasRouter.put(
  "/:schemaId",
  validate(schemasValidation.updateSchemaById, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.updateSchemaById(req.params.schemaId, req.body));
  }),
);

schemasRouter.patch(
  "/:schemaId/createSection",
  validate(schemasValidation.createSection, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.createSection(req.params.schemaId));
  }),
);

schemasRouter.patch(
  "/:schemaId/createQuestion",
  validate(schemasValidation.createQuestion, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.createQuestion(req.params.schemaId, req.body.sectionId),
      );
  }),
);

schemasRouter.patch(
  "/:schemaId/updateSection",
  validate(schemasValidation.updateSection, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.updateSection(req.params.schemaId, req.body));
  }),
);

schemasRouter.patch(
  "/:schemaId/updateQuestion",
  validate(schemasValidation.updateQuestion, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.updateQuestion(req.params.schemaId, req.body));
  }),
);

schemasRouter.patch(
  "/:schemaId/publish",
  validate(schemasValidation.publishSchema, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.publishSchema(req.params.schemaId));
  }),
);

schemasRouter.delete(
  "/:schemaId/section",
  validate(schemasValidation.deleteSection, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.deleteSection(req.params.schemaId, req.body.sectionId),
      );
  }),
);

schemasRouter.delete(
  "/:schemaId/question",
  validate(schemasValidation.deleteQuestion, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.deleteQuestion(
          req.params.schemaId,
          req.body.sectionId,
          req.body.questionId,
        ),
      );
  }),
);
export default schemasRouter;
