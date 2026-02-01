import { Types } from "mongoose";
import { MongoObjectId } from "../schema/types.js";

export const idTypeConverter = (ids: string[] | undefined): MongoObjectId[] | [] => {
  if (!ids) return [];

  return ids.map((id) => new Types.ObjectId(id));
};
