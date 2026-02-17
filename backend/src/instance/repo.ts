import sharedConsts from "../shared/consts.js";
import { MongoObjectId } from "../shared/types.js";
import { NotFoundError } from "../utils/customErrors.js";
import { Instance } from "./model.js";
import {
  IAnswerUpdate,
  IInstance,
  IInstanceInput,
  IInstanceStatusUpdate,
} from "./types.js";

class Repo {
  static instancesById = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Instance.find({ filledBy: userId });

  static myDrafts = async (userId: MongoObjectId): Promise<IInstance[]> =>
    Instance.find({ filledBy: userId, status: "Draft" });

  static getInstanceById = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> =>
    Instance.findById(instanceId).orFail(
      new NotFoundError(sharedConsts.ERRORS_TEXT.INSTANCE_NOT_FOUND),
    );

  static createInstance = async (
    newInstance: IInstanceInput,
  ): Promise<IInstance> => Instance.create(newInstance);

  static updateInstanceStatus = async (
    instanceId: MongoObjectId,
    instanceStatus: IInstanceStatusUpdate,
  ): Promise<IInstance> =>
    Instance.findByIdAndUpdate(instanceId, instanceStatus, {
      new: true,
    }).orFail(new NotFoundError(sharedConsts.ERRORS_TEXT.INSTANCE_NOT_FOUND));

  static updateAnswer = async (
    instanceId: MongoObjectId,
    answerId: MongoObjectId,
    updatedFields: IAnswerUpdate,
  ): Promise<IInstance> => {
    const updateQuery: Record<string, unknown> = {};

    Object.entries(updatedFields).forEach(([key, value]) => {
      updateQuery[`answers.$[answer].${key}`] = value;
    });

    return Instance.findByIdAndUpdate(
      instanceId,
      {
        $set: updateQuery,
      },
      {
        arrayFilters: [{ "answer._id": answerId }],
        new: true,
      },
    ).orFail(new NotFoundError(sharedConsts.ERRORS_TEXT.INSTANCE_NOT_FOUND));
  };
}

export default Repo;
