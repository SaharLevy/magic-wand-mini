import { Types } from "mongoose";
import Repo from "./repo.js";
import {
  IQuestionUpdate,
  ISchema,
  ISchemaInput,
  ISchemaUpdate,
  ISectionUpdate,
} from "./types.js";

class Manager {
  static getSchemas = async (): Promise<ISchema[]> => Repo.getSchemas();

  static getSchemasStatusDraft = async (): Promise<ISchema[]> =>
    Repo.getSchemasStatusDraft();

  static getSchemaById = async (schemaId: Types.ObjectId): Promise<ISchema> =>
    Repo.getSchemaById(schemaId);

  static createSchema = async (newSchema: ISchemaInput): Promise<ISchema> =>
    Repo.createSchema(newSchema);

  static updateSchemaById = async (
    schemaId: Types.ObjectId,
    newSchema: ISchemaUpdate,
  ): Promise<ISchema> => Repo.updateSchemaById(schemaId, newSchema);

  //will fix later on.
  static updateSection = async (
    schemaId: Types.ObjectId,
    newSection: ISectionUpdate,
  ): Promise<ISchema> => {
    const { sectionId, ...newUpdatedSection } = newSection;

    return Repo.updateSection(schemaId, sectionId, newUpdatedSection);
  };

  static updateQuestion = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
    questionId: Types.ObjectId,
    newQuestion: IQuestionUpdate,
  ): Promise<ISchema> =>
    Repo.updateQuestion(schemaId, sectionId, questionId, newQuestion);

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
