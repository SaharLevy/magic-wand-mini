import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import {
  IAnswerUpdateWithIds,
  IInstance,
  IInstanceInput,
  IInstanceStatusUpdate,
} from "./types.js";

class Manager {
  static getInstancesByUserId = async (
    userId: MongoObjectId,
  ): Promise<IInstance[]> => Repo.getInstancesByUserId(userId);

  static getMyDrafts = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Repo.getMyDrafts(userId);

  static createInstance = async (
    newInstance: IInstanceInput,
  ): Promise<IInstance> => Repo.createInstance(newInstance);

  static getInstanceById = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> => Repo.getInstanceById(instanceId);

  static publishInstance = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> => {
    return Repo.publishInstance(instanceId);
  };

  static updateAnswer = async (
    instanceId: MongoObjectId,
    answerData: IAnswerUpdateWithIds,
  ) => {
    const { answerId, ...updatedFields } = answerData;

    return Repo.updateAnswer(instanceId, answerId, updatedFields);
  };

  static deleteAnswer = async (
    instanceId: MongoObjectId,
    answerId: MongoObjectId,
  ): Promise<IInstance> => Repo.deleteAnswer(instanceId, answerId);
}

export default Manager;
