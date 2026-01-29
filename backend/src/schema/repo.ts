import { Types } from "mongoose";
import {
  IQuestionUpdate,
  ISchema,
  ISchemaInput,
  ISchemaUpdate,
  ISectionUpdate,
} from "./types.js";
import { FormSchema } from "./model.js";
import { NotFoundError } from "../utils/customErrors.js";

class Repo {
  static getSchemas = async (): Promise<ISchema[]> => FormSchema.find({});

  static getAllDrafts = async (): Promise<ISchema[]> =>
    FormSchema.find({ status: "Draft" });

  static getSchemaById = async (schemaId: Types.ObjectId): Promise<ISchema> =>
    FormSchema.findById(schemaId).orFail(new NotFoundError("Schema not found"));

  static createSchema = async (newSchema: ISchemaInput): Promise<ISchema> =>
    FormSchema.create(newSchema);

  static updateSchemaById = async (
    schemaId: Types.ObjectId,
    newSchema: ISchemaUpdate,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(schemaId, newSchema, { new: true }).orFail(
      new NotFoundError("Schema not found"),
    );

  static updateSection = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
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
    ).orFail(new NotFoundError("Schema not found"));
  };

  static updateQuestion = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
    questionId: Types.ObjectId,
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
    ).orFail(new NotFoundError("Schema not found"));
  };

  static deleteSection = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $pull: { sections: { _id: sectionId } } },
      { new: true },
    ).orFail(new NotFoundError("Schema not found"));

  static deleteQuestion = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
    questionId: Types.ObjectId,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { $pull: { "sections.$[section].questions": { _id: questionId } } },
      { new: true, arrayFilters: [{ "section._id": sectionId }] },
    ).orFail(new NotFoundError("Schema not found"));
}

export default Repo;
