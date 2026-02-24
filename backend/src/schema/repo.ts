import {
  IQuestionUpdate,
  ISchema,
  ISchemaUpdate,
  ISectionUpdate,
  SchemaStatus,
} from "./types.js";
import { FormSchema } from "./model.js";
import { NotFoundError } from "../utils/customErrors.js";
import { MongoObjectId, QuestionTypes } from "../shared/types.js";

export const SCHEMA_NOT_FOUND = "Schema not found";

class Repo {
  static getSchemasByUserId = async (
    userId: MongoObjectId,
    statuses: SchemaStatus[],
  ): Promise<ISchema[]> =>
    FormSchema.find({ filledBy: userId, status: { $in: statuses } });

  static getSchemaById = async (schemaId: MongoObjectId): Promise<ISchema> =>
    FormSchema.findById(schemaId).orFail(new NotFoundError(SCHEMA_NOT_FOUND));

  static createSchema = async (userId: MongoObjectId): Promise<ISchema> => {
    // for now im leaving the createdBy as fixed ObjectId will come back for it when ill work on the User.

    const emptySchema = {
      title: "",
      createdBy: "507f1f77bcf86cd799439011",
    };

    return FormSchema.create(emptySchema);
  };

  static updateSchemaById = async (
    schemaId: MongoObjectId,
    newSchema: ISchemaUpdate,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(schemaId, newSchema, { new: true }).orFail(
      new NotFoundError(SCHEMA_NOT_FOUND),
    );

  static createSection = async (schemaId: MongoObjectId): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $push: { sections: {} } },
      { new: true },
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));

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
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));
  };

  static createQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<ISchema> => {
    // TODO:
    // - make it so that its not a must to include order to update the section/question
    // - refactor createQuestion so that the question order number auto inc.

    const emptyQuestion = {
      type: QuestionTypes.SHORT_TEXT,
      title: "",
      order: 1,
    };

    return FormSchema.findByIdAndUpdate(
      schemaId,
      { $push: { "sections.$[section].questions": emptyQuestion } },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));
  };

  static updateQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
    newQuestion: IQuestionUpdate,
  ): Promise<ISchema> => {
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
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));
  };

  static deleteSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $pull: { sections: { _id: sectionId } } },
      { new: true },
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));

  static deleteQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $pull: { "sections.$[section].questions": { _id: questionId } } },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));
}

export default Repo;
