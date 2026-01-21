import mongoose, { Schema } from "mongoose";
import type { IUser } from "./types.js";

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  personalNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
