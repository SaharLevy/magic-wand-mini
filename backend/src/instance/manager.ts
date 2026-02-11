import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import { IInstance } from "./types.js";

class Manager {
  static myInstances = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Repo.myInstances(userId);
}

export default Manager;
