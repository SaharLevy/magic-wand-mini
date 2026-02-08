import {
  IQuestionUpdate,
  ISchema,
  ISchemaInput,
  ISchemaUpdate,
  ISectionUpdate,
  SchemaStatus,
} from "./types.js";
import { FormSchema } from "./model.js";
import { NotFoundError } from "../utils/customErrors.js";
import { MongoObjectId } from "../shared/types.js";
import sharedConsts from "../shared/consts.js";

class Repo {
  static getSchemas = async (): Promise<ISchema[]> => FormSchema.find({});

  static getAllDrafts = async (): Promise<ISchema[]> =>
    FormSchema.find({ status: SchemaStatus.Draft });

  static getSchemaById = async (schemaId: MongoObjectId): Promise<ISchema> =>
    FormSchema.findById(schemaId).orFail(
      new NotFoundError(sharedConsts.ERRORS_TEXT.SCHEMA_NOT_FOUND),
    );

  static createSchema = async (newSchema: ISchemaInput): Promise<ISchema> =>
    FormSchema.create(newSchema);

  static updateSchemaById = async (
    schemaId: MongoObjectId,
    newSchema: ISchemaUpdate,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(schemaId, newSchema, { new: true }).orFail(
      new NotFoundError(sharedConsts.ERRORS_TEXT.SCHEMA_NOT_FOUND),
    );

  static updateSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    newSection: ISectionUpdate,
  ) => {
    const newSectionQueries: Record<string, string | number> = {};
    Object.entries(newSection).forEach(([key, value]) => {
      newSectionQueries[`sections.$[section].${key}`] = value;
    });

    return FormSchema.findByIdAndUpdate(
      schemaId,
      { $set: newSectionQueries },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(sharedConsts.ERRORS_TEXT.SCHEMA_NOT_FOUND));
  };

  static updateQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
    newQuestion: IQuestionUpdate,
  ) => {
    const newQuestionQueries: Record<string, unknown> = {};
    Object.entries(newQuestion).forEach(([key, value]) => {
      newQuestionQueries[`sections.$[section].questions.$[question].${key}`] =
        value;
    });

    return FormSchema.findByIdAndUpdate(
      schemaId,
      { $set: newQuestionQueries },
      {
        new: true,
        arrayFilters: [
          { "section._id": sectionId },
          { "question._id": questionId },
        ],
      },
    ).orFail(new NotFoundError(sharedConsts.ERRORS_TEXT.SCHEMA_NOT_FOUND));
  };

  static deleteSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $pull: { sections: { _id: sectionId } } },
      { new: true },
    ).orFail(new NotFoundError(sharedConsts.ERRORS_TEXT.SCHEMA_NOT_FOUND));

  static deleteQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $pull: { "sections.$[section].questions": { _id: questionId } } },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(sharedConsts.ERRORS_TEXT.SCHEMA_NOT_FOUND));
}

export default Repo;
