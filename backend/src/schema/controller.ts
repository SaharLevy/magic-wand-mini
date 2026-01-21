import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import Manager from "./manager.js";

class Controller {
  static getSchemas = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(await Manager.getSchemas());
  };

  static getSchemasStatusDraft = async (req: Request, res: Response) =>{
    res.status(StatusCodes.OK).json(await Manager.getSchemasStatusDraft)
  }
}

export default Controller;
