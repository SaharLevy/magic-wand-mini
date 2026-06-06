import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import SchemaRepo, { SCHEMA_NOT_FOUND } from "../schema/repo.js";
import {
  IAnswerUpdateWithIds,
  IInstance,
  IInstanceInput,
  IInstancePopulated,
  IInstanceWithSchemaTitle,
  InstanceStatus,
  ISectionAnswer,
} from "./types.js";
import { NotFoundError } from "../utils/customErrors.js";
import { generateEmptyAnswer } from "../utils/helperFunctions.js";

class Manager {
  static getInstancesByUserId = async (
    userId: MongoObjectId,
  ): Promise<IInstanceWithSchemaTitle[]> => Repo.getInstancesByUserId(userId);

  static createInstance = async (
    schemaId: MongoObjectId,
    filledBy: MongoObjectId,
  ): Promise<IInstancePopulated> => {
    const schema = await SchemaRepo.getSchemaById(schemaId);

    if (!schema) throw new NotFoundError(SCHEMA_NOT_FOUND);

    const sections: ISectionAnswer[] = schema.sections.map((section) => {
      return {
        sectionId: section._id,
        answers: section.questions.map((question) => {
          return generateEmptyAnswer(question.type, question._id);
        }),
      };
    });

    const newInstance: IInstanceInput = {
      schemaId,
      filledBy,
      status: InstanceStatus.Draft,
      sections,
    };
    const createdInstance = await Repo.createInstance(newInstance);

    return { ...createdInstance, schemaId: schema };
  };

  static getInstanceById = async (
    instanceId: MongoObjectId,
  ): Promise<IInstancePopulated> => Repo.getInstanceById(instanceId);

  static publishInstance = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> => {
    return Repo.publishInstance(instanceId);
  };

  static updateAnswer = async (
    instanceId: MongoObjectId,
    answerData: IAnswerUpdateWithIds,
  ) => {
    const { sectionId, answerId, ...updatedFields } = answerData;

    return Repo.updateAnswer(instanceId, sectionId, answerId, updatedFields);
  };

  static deleteAnswer = async (
    instanceId: MongoObjectId,
    sectionId: MongoObjectId,
    answerId: MongoObjectId,
  ): Promise<IInstance> => Repo.deleteAnswer(instanceId, sectionId, answerId);

  static deleteInstance = async (
    instanceId: MongoObjectId,
  ): Promise<IInstance> => Repo.deleteInstance(instanceId);
}

export default Manager;
