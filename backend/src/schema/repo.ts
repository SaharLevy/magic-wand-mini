import { Types } from "mongoose";
import { ISchema, ISchemaInput } from "./types.js";
import { FormSchema } from "./model.js";
import { NotFoundError } from "../utils/customErrors.js";

class Repo {
  static getSchemas = async (): Promise<ISchema[]> => FormSchema.find({});

  static getSchemasStatusDraft = async (): Promise<ISchema[]> =>
    FormSchema.find({ status: "Draft" });

  static getSchemaById = async (schemaId: Types.ObjectId): Promise<ISchema> =>
    FormSchema.findById(schemaId).orFail(new NotFoundError("Schema not found"));

  static createSchema = async (newSchema: ISchemaInput): Promise<ISchema> =>
    FormSchema.create(newSchema);

  static updateSchemaById = async (
    schemaId: Types.ObjectId,
    newSchema: ISchema,
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(schemaId, newSchema, { new: true }).orFail(
      new NotFoundError("Schema not found"),
    );

  static updateSchemaAssignedUsers = async (
    schemaId: Types.ObjectId,
    assignedUsers: number[],
  ): Promise<ISchema> =>
    FormSchema.findByIdAndUpdate(
      schemaId,
      { assignedUsers },
      { new: true },
    ).orFail(new NotFoundError("Schema not found"));

  static updateSection = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
  ) => {
    const section = await FormSchema.aggregate();
  };

  static updateQuestion = async (
    schemaId: Types.ObjectId,
    sectionId: Types.ObjectId,
    questionId: Types.ObjectId,
  ) => {
    const section = await FormSchema.aggregate();
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
}

export default Repo;
