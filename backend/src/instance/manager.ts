import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import SchemaRepo from "../schema/repo.js";
import {
  IAnswerUpdateWithIds,
  IInstance,
  IInstanceInput,
  InstanceStatus,
} from "./types.js";

class Manager {
  static getInstancesByUserId = async (
    userId: MongoObjectId,
    statuses: InstanceStatus[],
  ): Promise<IInstance[]> => Repo.getInstancesByUserId(userId, statuses);

  static createInstance = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
    newInstance: IInstanceInput,
  ): Promise<IInstance> => {
    const schema = await SchemaRepo.getSchemaById(schemaId);
    const question = schema?.sections
      .find((section) => section._id === sectionId)
      ?.questions.find((question) => question._id === questionId);

    return Repo.createInstance(newInstance);
  };

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
