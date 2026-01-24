import type {Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import Manager from "./manager.js";
import type { TypedRequest } from "../utils/typedRequest.js";
import schemasValidation from "./validation.js";

class Controller {
  static getSchemas = async (
    req: TypedRequest<typeof schemasValidation.getSchemas>,
    res: Response,
  ) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemas());
  };

  static getSchemasStatusDraft = async (
    req: TypedRequest<typeof schemasValidation.getSchemasStatusDraft>,
    res: Response,
  ) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemasStatusDraft());
  };

  static getSchemaById = async (
    req: TypedRequest<typeof schemasValidation.getSchemaById>,
    res: Response,
  ) => {
    res
      .status(StatusCodes.OK)
      .json(await Manager.getSchemaById(new Types.ObjectId(req.params.id)));
  };

  static createSchema = async (
    req: TypedRequest<typeof schemasValidation.createSchema>,
    res: Response,
  ) => {
    const newSchema = {
      ...req.body,
      createdBy: new Types.ObjectId(req.body.createdBy),
      assignedUsers: req.body.assignedUsers.map((id) => new Types.ObjectId(id)),
    };
    res.status(StatusCodes.CREATED).json(await Manager.createSchema(newSchema));
  };
}

export default Controller;
