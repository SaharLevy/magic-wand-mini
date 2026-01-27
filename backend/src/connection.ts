import mongoose from "mongoose";
import config from "./utils/config.js";

const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(config.CONNECTION_STRING, {
      dbName: config.DB_NAME,
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

const closeConnectionToDb = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error(`MongoDB closing has failed : ${error}`);
  }
};

export { closeConnectionToDb, connectToDb };
