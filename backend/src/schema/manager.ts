import { Types } from "mongoose";
import Repo from "./repo.js";
import { ISchema } from "./types.js";

class Manager {
  static getSchemas = async (): Promise<ISchema[]> => Repo.getSchemas();

  static getSchemasStatusDraft = async (): Promise<ISchema[]> =>
    Repo.getSchemasStatusDraft();

  static getSchemaById = async (schemaId: Types.ObjectId): Promise<ISchema> =>
    Repo.getSchemaById(schemaId);
}

export default Manager;
