import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import { IInstance, IInstanceInput } from "./types.js";

class Manager {
  static instancesById = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Repo.instancesById(userId);

  static myDrafts = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Repo.myDrafts(userId);

  static createInstance = async (
    newInstance: IInstanceInput,
  ): Promise<IInstance> => Repo.createInstance(newInstance);

  static getInstanceById = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> => Repo.getInstanceById(instanceId);
}

export default Manager;
