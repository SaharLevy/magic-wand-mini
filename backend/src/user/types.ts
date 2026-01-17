import type { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  personalNumber: number;
  createdAt: Date;
  updatedAt: Date;
}