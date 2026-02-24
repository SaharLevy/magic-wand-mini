import { MongoObjectId } from "../shared/types.js";
import { NotFoundError } from "../utils/customErrors.js";
import { Instance } from "./model.js";
import {
  IAnswerUpdate,
  IInstance,
  IInstanceInput,
  InstanceStatus,
} from "./types.js";

const INSTANCE_NOT_FOUND = "Instance not found";

class Repo {
  static getInstancesByUserId = async (
    userId: MongoObjectId,
    statuses: InstanceStatus[],
  ): Promise<IInstance[]> => {
    return Instance.find({ filledBy: userId, status: { $in: statuses } });
  };

  static getInstanceById = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> =>
    Instance.findById(instanceId).orFail(new NotFoundError(INSTANCE_NOT_FOUND));

  static createInstance = async (
    newInstance: IInstanceInput,
  ): Promise<IInstance> => Instance.create(newInstance);

  static publishInstance = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> =>
    Instance.findByIdAndUpdate(
      instanceId,
      { status: InstanceStatus.Published },
      {
        new: true,
      },
    ).orFail(new NotFoundError(INSTANCE_NOT_FOUND));

  static updateAnswer = async (
    instanceId: MongoObjectId,
    sectionId: MongoObjectId,
    answerId: MongoObjectId,
    updatedFields: IAnswerUpdate,
  ): Promise<IInstance> => {
    const updateQuery: Record<string, unknown> = {};

    Object.entries(updatedFields).forEach(([key, value]) => {
      updateQuery[`sections.$[section].answers.$[answer].${key}`] = value;
    });

    return Instance.findByIdAndUpdate(
      instanceId,
      {
        $set: updateQuery,
      },
      {
        arrayFilters: [
          { "section.sectionId": sectionId },
          { "answer._id": answerId },
        ],
        new: true,
      },
    ).orFail(new NotFoundError(INSTANCE_NOT_FOUND));
  };

  static deleteAnswer = async (
    instanceId: MongoObjectId,
    sectionId: MongoObjectId,
    answerId: MongoObjectId,
  ): Promise<IInstance> =>
    Instance.findByIdAndUpdate(
      instanceId,
      { $pull: { "sections.$[section].answers": { _id: answerId } } },
      { arrayFilters: [{ "section.sectionId": sectionId }], new: true },
    ).orFail(new NotFoundError(INSTANCE_NOT_FOUND));
}

export default Repo;
