import Repo from "./repo.js";
import {
  IQuestion,
  IQuestionUpdateRequest,
  ISchema,
  ISchemaUpdate,
  ISection,
  ISectionUpdateRequest,
  SchemaStatus,
} from "./types.js";
import { MongoObjectId } from "../shared/types.js";

class Manager {
  static getSchemasByUserId = async (
    userId: MongoObjectId,
    statuses: SchemaStatus[],
  ): Promise<ISchema[]> => Repo.getSchemasByUserId(userId, statuses);

  static getSchemaById = async (schemaId: MongoObjectId): Promise<ISchema> =>
    Repo.getSchemaById(schemaId);

  static createSchema = async (
    userId: MongoObjectId,
    schemaTitle: string,
  ): Promise<ISchema> => Repo.createSchema(userId, schemaTitle);

  static createSection = async (
    schemaId: MongoObjectId,
    insertAtOrder?: number,
  ): Promise<ISection> => {
    const schema = await Repo.getSchemaById(schemaId);
    const order = insertAtOrder ?? schema.sections.length;

    if (insertAtOrder !== undefined)
      await Repo.shiftSectionOrders(schemaId, insertAtOrder);

    const newSection = {
      title: "סעיף ללא שם",
      description: "",
      order,
      questions: [],
    };

    return Repo.createSection(schemaId, newSection);
  };

  static createQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<IQuestion> => Repo.createQuestion(schemaId, sectionId);

  static updateSchemaById = async (
    schemaId: MongoObjectId,
    newSchema: ISchemaUpdate,
  ): Promise<ISchema> => Repo.updateSchemaById(schemaId, newSchema);

  static updateSection = async (
    schemaId: MongoObjectId,
    sectionData: ISectionUpdateRequest,
  ): Promise<ISchema> => {
    const { sectionId, ...updatedSection } = sectionData;

    return Repo.updateSection(schemaId, sectionId, updatedSection);
  };

  static updateQuestion = async (
    schemaId: MongoObjectId,
    questionData: IQuestionUpdateRequest,
  ): Promise<ISchema> => {
    const { sectionId, questionId, ...updatedQuestion } = questionData;

    return Repo.updateQuestion(
      schemaId,
      sectionId,
      questionId,
      updatedQuestion,
    );
  };

  static deleteSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<ISchema> => Repo.deleteSection(schemaId, sectionId);

  static deleteQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
  ): Promise<ISchema> => Repo.deleteQuestion(schemaId, sectionId, questionId);
}

export default Manager;
