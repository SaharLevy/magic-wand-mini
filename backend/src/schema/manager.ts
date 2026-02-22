import { Types } from "mongoose";
import Repo from "./repo.js";
import {
  IQuestionUpdateRequest,
  ISchema,
  ISchemaInput,
  ISchemaUpdate,
  ISectionUpdateRequest,
} from "./types.js";
import { MongoObjectId } from "../shared/types.js";

class Manager {
  static getSchemas = async (): Promise<ISchema[]> => Repo.getSchemas();

  static getAllDrafts = async (): Promise<ISchema[]> => Repo.getAllDrafts();

  static getSchemaById = async (schemaId: MongoObjectId): Promise<ISchema> =>
    Repo.getSchemaById(schemaId);

  static createSchema = async (newSchema: ISchemaInput): Promise<ISchema> =>
    Repo.createSchema(newSchema);

  static createSection = async (schemaId: MongoObjectId): Promise<ISchema> =>
    Repo.createSection(schemaId);

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
