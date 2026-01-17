import Repo from "./repo.js";
import { ISchema } from "./types.js";

class Manager {
  static getSchemas = async (): Promise<ISchema[]> => Repo.getSchemas();
}

export default Manager;
