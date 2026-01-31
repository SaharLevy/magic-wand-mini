import { Types } from "mongoose";

export const idTypeConverter = (ids: string[] | undefined) => {
  if (!ids) return [];

  return ids.map((id) => new Types.ObjectId(id));
};
