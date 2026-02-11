import { MongoObjectId } from "../shared/types.js";
import { Instance } from "./model.js";
import { IInstance } from "./types.js";

class Repo {
  static myInstances = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Instance.find({});
}

export default Repo;
