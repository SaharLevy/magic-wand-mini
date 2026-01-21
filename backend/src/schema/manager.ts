import Repo from "./repo.js";
import { ISchema } from "./types.js";

class Manager {
  static getSchemas = async (): Promise<ISchema[]> => Repo.getSchemas();

  static getSchemasStatusDraft = async (): Promise<ISchema[]> =>
    Repo.getSchemasStatusDraft();
}

export default Manager;
