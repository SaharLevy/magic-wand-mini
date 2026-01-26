import { Types } from "mongoose";

export const idTypeConverter = (ids: string[] | undefined) => {
  if (!ids) return [];

  const realIds = ids.filter((id) => id !== undefined);
  return realIds.map((id) => new Types.ObjectId(id));
};
