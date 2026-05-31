import {
  IQuestion,
  IQuestionUpdate,
  ISchema,
  ISection,
  ISectionUpdate,
  SchemaStatus,
} from "./types.js";
import { FormSchema } from "./model.js";
import { NotFoundError } from "../utils/customErrors.js";
import { MongoObjectId, QuestionTypes } from "../shared/types.js";

export const SCHEMA_NOT_FOUND = "Schema not found";
export const SCHEMA_NOT_EDITABLE = "Schema isnt editable.";

// to add an error object that will save the error texts.

class Repo {
  static getSchemasByUserId = async (
    userId: MongoObjectId,
    statuses: SchemaStatus[],
  ): Promise<ISchema[]> =>
    FormSchema.find({ filledBy: userId, status: { $in: statuses } });

  static getSchemaById = async (schemaId: MongoObjectId): Promise<ISchema> =>
    FormSchema.findById(schemaId).orFail(new NotFoundError(SCHEMA_NOT_FOUND));

  static createSchema = async (
    userId: MongoObjectId,
    schemaTitle: string,
  ): Promise<ISchema> => {
    // for now im leaving the createdBy as fixed ObjectId will come back for it when ill work on the User.

    const emptySchema = {
      title: schemaTitle,
      createdBy: userId,
      status: SchemaStatus.Draft,
      assignedUsers: [],
      sections: [],
    };

    return FormSchema.create(emptySchema);
  };

  static updateSchemaById = async (
    schemaId: MongoObjectId,
    newSchema: ISchema,
  ): Promise<ISchema> =>
    FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      newSchema,
      { new: true },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));

  static createSection = async (
    schemaId: MongoObjectId,
    section: Partial<ISection>,
  ): Promise<ISection> => {
    const updatedSchema = await FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $push: { sections: section } },
      { new: true },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));

    const newSection = updatedSchema.sections.at(-1);

    if (!newSection) throw new Error("Failed to retrieve created section");

    return newSection;
  };

  static updateSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    newSection: ISectionUpdate,
  ) => {
    const newSectionQueries: Record<string, string | number> = {};
    Object.entries(newSection).forEach(([key, value]) => {
      newSectionQueries[`sections.$[section].${key}`] = value;
    });

    return FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $set: newSectionQueries },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));
  };

  static createQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<IQuestion> => {
    // TODO:
    // - make it so that its not a must to include order to update the section/question
    // - refactor createQuestion so that the question order number auto inc.

    const emptyQuestion = {
      type: QuestionTypes.SHORT_TEXT,
      title: "",
      order: 1,
    };

    const updatedSchema = await FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $push: { "sections.$[section].questions": emptyQuestion } },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));

    const updatedSection = updatedSchema.sections.find((section) =>
      section._id.equals(sectionId),
    );

    if (!updatedSection) throw new Error("Section not found after update");

    const newQuestion = updatedSection.questions.at(-1);

    if (!newQuestion) throw new Error("Failed to retrieve created question");

    return newQuestion;
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

    return FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $set: newQuestionQueries },
      {
        new: true,
        arrayFilters: [
          { "section._id": sectionId },
          { "question._id": questionId },
        ],
      },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));
  };

  static publishSchema = async (schemaId: MongoObjectId): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $set: { status: SchemaStatus.Published } },
      { new: true },
    ).orFail(new NotFoundError(SCHEMA_NOT_FOUND));

  static deleteSection = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
  ): Promise<ISchema> =>
    FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $pull: { sections: { _id: sectionId } } },
      { new: true },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));

  static deleteQuestion = async (
    schemaId: MongoObjectId,
    sectionId: MongoObjectId,
    questionId: MongoObjectId,
  ): Promise<ISchema> =>
    FormSchema.findOneAndUpdate(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $pull: { "sections.$[section].questions": { _id: questionId } } },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError(SCHEMA_NOT_EDITABLE));

  static shiftSectionOrders = async (
    schemaId: MongoObjectId,
    fromOrder: number,
  ): Promise<void> => {
    await FormSchema.updateOne(
      { _id: schemaId, status: SchemaStatus.Draft },
      { $inc: { "sections.$[section].order": 1 } },
      { arrayFilters: [{ "section.order": { $gte: fromOrder } }] },
    );
  };
}

export default Repo;
