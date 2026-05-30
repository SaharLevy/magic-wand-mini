import Repo, { SCHEMA_NOT_EDITABLE } from "./repo.js";
import {
  IQuestion,
  IQuestionUpdateRequest,
  ISchema,
  ISection,
  ISectionUpdateRequest,
  SchemaStatus,
} from "./types.js";
import { MongoObjectId } from "../shared/types.js";
import { ConflictError } from "../utils/customErrors.js";

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
    const schema = await this.assertDraft(schemaId);
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
  ): Promise<IQuestion> => {
    await this.assertDraft(schemaId);
    return Repo.createQuestion(schemaId, sectionId);
  };

  static updateSchemaById = async (
    schemaId: MongoObjectId,
    newSchema: ISchema,
  ): Promise<ISchema> => {
    await this.assertDraft(schemaId);
    return Repo.updateSchemaById(schemaId, newSchema);
  };

  static updateSection = async (
    schemaId: MongoObjectId,
    sectionData: ISectionUpdateRequest,
  ): Promise<ISchema> => {
    await this.assertDraft(schemaId);
    const { sectionId, ...updatedSection } = sectionData;

    return Repo.updateSection(schemaId, sectionId, updatedSection);
  };

  static updateQuestion = async (
    schemaId: MongoObjectId,
    questionData: IQuestionUpdateRequest,
  ): Promise<ISchema> => {
    await this.assertDraft(schemaId);
    const { sectionId, questionId, ...updatedQuestion } = questionData;

    return Repo.updateQuestion(
      schemaId,
      sectionId,
      questionId,
      updatedQuestion,
    );
  };

  static publishSchema = async (schemaId: MongoObjectId): Promise<ISchema> =>
    Repo.publishSchema(schemaId);

  static deleteSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<ISchema> => {
    await this.assertDraft(schemaId);
    return Repo.deleteSection(schemaId, sectionId);
  };

  static deleteQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
  ): Promise<ISchema> => {
    await this.assertDraft(schemaId);
    return Repo.deleteQuestion(schemaId, sectionId, questionId);
  };

  private static assertDraft = async (
    schemaId: MongoObjectId,
  ): Promise<ISchema> => {
    const schema = await Repo.getSchemaById(schemaId);

    if (schema.status !== SchemaStatus.Draft)
      throw new ConflictError(SCHEMA_NOT_EDITABLE);

    return schema;
  };
}

export default Manager;
