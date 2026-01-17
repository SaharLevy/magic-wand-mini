import { Types } from "mongoose";
import { ISchema } from "./types.js";
import { FormSchema } from "./model.js";

class Repo {
  static getSchemas = async (): Promise<ISchema[]> => FormSchema.find({});
}

export default Repo;
