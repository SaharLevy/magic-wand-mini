import { Types } from "mongoose";
import Repo from "./repo.js";
import {
  IQuestionUpdateRequest,
  ISchema,
  ISchemaInput,
  ISchemaUpdate,
  ISectionUpdateRequest,
} from "./types.js";

class Manager {
  static getSchemas = async (): Promise<ISchema[]> => Repo.getSchemas();

  static getAllDrafts = async (): Promise<ISchema[]> => Repo.getAllDrafts();

  static getSchemaById = async (schemaId: Types.ObjectId): Promise<ISchema> =>
    Repo.getSchemaById(schemaId);

  static createSchema = async (newSchema: ISchemaInput): Promise<ISchema> =>
    Repo.createSchema(newSchema);

  static updateSchemaById = async (
    schemaId: Types.ObjectId,
    newSchema: ISchemaUpdate,
  ): Promise<ISchema> => Repo.updateSchemaById(schemaId, newSchema);

  static updateSection = async (
    schemaId: Types.ObjectId,
    sectionData: ISectionUpdateRequest,
  ): Promise<ISchema> => {
    const { sectionId, ...updatedSection } = sectionData;

    return Repo.updateSection(
      schemaId,
      new Types.ObjectId(sectionId),
      updatedSection,
    );
  };

  static updateQuestion = async (
    schemaId: Types.ObjectId,
    questionData: IQuestionUpdateRequest,
  ): Promise<ISchema> => {
    const { sectionId, questionId, ...updatedQuestion } = questionData;

    return Repo.updateQuestion(
      schemaId,
      new Types.ObjectId(sectionId),
      new Types.ObjectId(questionId),
      updatedQuestion,
    );
  };

  static deleteSection = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
  ): Promise<ISchema> => Repo.deleteSection(schemaId, sectionId);

  static deleteQuestion = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
    questionId: Types.ObjectId,
  ): Promise<ISchema> => Repo.deleteQuestion(schemaId, sectionId, questionId);
}

export default Manager;
