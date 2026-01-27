import { Router } from "express";
import schemasValidation from "./validation.js";
import validate from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import Manager from "./manager.js";
import { Types } from "mongoose";
import { idTypeConverter } from "../utils/helperFunctions.js";
import { ISchemaUpdate, ISectionUpdateReq } from "./types.js";

// need to update ids so that only schemaId is being passed in params and the rest with body.

const schemasRouter = Router();

schemasRouter.get(
  "/",
  validate(schemasValidation.getSchemas, async (_, res) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemas());
  }),
);

schemasRouter.get(
  "/getDrafts",
  validate(schemasValidation.getSchemasStatusDraft, async (_, res) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemasStatusDraft());
  }),
);

schemasRouter.get(
  "/:id",
  validate(schemasValidation.getSchemaById, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.getSchemaById(new Types.ObjectId(req.params.id)));
  }),
);

schemasRouter.post(
  "/",
  validate(schemasValidation.createSchema, async (req, res) => {
    res.status(StatusCodes.CREATED).json(
      await Manager.createSchema({
        ...req.body,
        createdBy: new Types.ObjectId(req.body.createdBy),
        assignedUsers: req.body.assignedUsers.map(
          (id) => new Types.ObjectId(id),
        ),
      }),
    );
  }),
);

schemasRouter.put(
  "/:id",
  validate(schemasValidation.updateSchemaById, async (req, res) => {
    res.status(StatusCodes.OK).json(
      await Manager.updateSchemaById(new Types.ObjectId(req.params.id), {
        ...req.body,
        assignedUsers: idTypeConverter(req.body.assignedUsers),
      }),
    );
  }),
);

schemasRouter.put(
  "/:id/section/update",
  validate(schemasValidation.updateSection, async (req, res) => {
    const { sectionId, ...updatedSection } = req.body;
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.updateSection(
          new Types.ObjectId(req.params.id),
          new Types.ObjectId(sectionId),
          updatedSection,
        ),
      );
  }),
);

schemasRouter.delete(
  "/section/delete",
  validate(schemasValidation.deleteSection, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.deleteSection(
          new Types.ObjectId(req.body.schemaId),
          new Types.ObjectId(req.body.sectionId),
        ),
      );
  }),
);

schemasRouter.delete(
  "/question/delete",
  validate(schemasValidation.deleteQuestion, async (req, res) => {
    res
      .status(StatusCodes.OK)
      .json(
        await Manager.deleteQuestion(
          new Types.ObjectId(req.body.schemaId),
          new Types.ObjectId(req.body.sectionId),
          new Types.ObjectId(req.body.questionId),
        ),
      );
  }),
);
export default schemasRouter;
