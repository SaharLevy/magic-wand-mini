import { Router } from "express";
import schemasValidation from "./validation.js";
import validate from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import Manager from "./manager.js";


const schemasRouter = Router();

schemasRouter.get(
  "/",
  validate(schemasValidation.getSchemas, async (_, res) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemas());
  }),
);

schemasRouter.get(
  "/getDrafts",
  validate(schemasValidation.getAllDrafts, async (_, res) => {
    res.status(StatusCodes.OK).json(await Manager.getAllDrafts());
  }),
);

schemasRouter.get(
  "/:id",
  validate(schemasValidation.getSchemaById, async (req, res) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemaById(req.params.id));
  }),
);

schemasRouter.post(
  "/",
  validate(schemasValidation.createSchema, async (req, res) => {
    res.status(StatusCodes.CREATED).json(
      await Manager.createSchema({
        ...req.body,
        createdBy: req.body.createdBy,
        assignedUsers: req.body.assignedUsers,
      }),
    );
  }),
);

schemasRouter.put(
  "/:id",
  validate(schemasValidation.updateSchemaById, async (req, res) => {
    res.status(StatusCodes.OK).json(
      await Manager.updateSchemaById(req.params.id, {
        ...req.body,
      }),
    );
  }),
);

schemasRouter.patch(
  "/:id/section",
  validate(schemasValidation.updateSection, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.updateSection(req.params.id, req.body));
  }),
);

schemasRouter.patch(
  "/:id/question",
  validate(schemasValidation.updateQuestion, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.updateQuestion(req.params.id, req.body));
  }),
);

schemasRouter.delete(
  "/section",
  validate(schemasValidation.deleteSection, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.deleteSection(req.body.schemaId, req.body.sectionId));
  }),
);

schemasRouter.delete(
  "/question",
  validate(schemasValidation.deleteQuestion, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.deleteQuestion(
          req.body.schemaId,
          req.body.sectionId,
          req.body.questionId,
        ),
      );
  }),
);
export default schemasRouter;
