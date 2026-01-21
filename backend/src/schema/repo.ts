import { Types } from "mongoose";
import { ISchema } from "./types.js";
import { FormSchema } from "./model.js";

class Repo {
  static getSchemas = async (): Promise<ISchema[]> => FormSchema.find({});

  static getSchemasStatusDraft = async (): Promise<ISchema[]> =>
    FormSchema.find({ status: "Draft" });
}

export default Repo;
