import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import {
  IAnswer,
  IAnswerUpdate,
  IAnswerUpdateWithIds,
  IInstance,
  IInstanceInput,
  IInstanceStatusUpdate,
} from "./types.js";

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

  static updateInstanceStatus = async (
    instanceId: MongoObjectId,
    updatedStatus: IInstanceStatusUpdate,
  ): Promise<IInstance> => {
    return Repo.updateInstanceStatus(instanceId, updatedStatus);
  };

  static updateAnswer = async (
    instanceId: MongoObjectId,
    answerData: IAnswerUpdateWithIds,
  ) => {
    const { answerId, ...updatedFields } = answerData;

    return Repo.updateAnswer(instanceId, answerId, updatedFields);
  };
}

export default Manager;
