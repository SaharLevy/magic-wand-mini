import { MongoObjectId } from "../shared/types.js";
import Repo from "./repo.js";
import SchemaRepo, { SCHEMA_NOT_FOUND } from "../schema/repo.js";
import {
  IAnswerUpdateWithIds,
  IInstance,
  IInstanceInput,
  InstanceStatus,
  ISectionAnswer,
} from "./types.js";
import { NotFoundError } from "../utils/customErrors.js";
import { generateEmptyAnswer } from "../utils/helperFunctions.js";

class Manager {
  static getInstancesByUserId = async (
    userId: MongoObjectId,
    statuses: InstanceStatus[],
  ): Promise<IInstance[]> => Repo.getInstancesByUserId(userId, statuses);

  // need to translate the questions inside of the schema to fillable answers.
  static createInstance = async (
    schemaId: MongoObjectId,
    filledBy: MongoObjectId,
  ): Promise<IInstance> => {
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
    const { sectionId, answerId, ...updatedFields } = answerData;

    return Repo.updateAnswer(instanceId, sectionId, answerId, updatedFields);
  };

  static deleteAnswer = async (
    instanceId: MongoObjectId,
    sectionId: MongoObjectId,
    answerId: MongoObjectId,
  ): Promise<IInstance> => Repo.deleteAnswer(instanceId, sectionId, answerId);
}

export default Manager;
