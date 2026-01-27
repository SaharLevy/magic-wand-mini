import cors from "cors";
import "dotenv/config";
import express from "express";
import appRouter from "./appRouter.js";
import { closeConnectionToDb, connectToDb } from "./connection.js";
import config from "./utils/config.js";
import errorHandler from "./utils/errorHandler.js";
import { log } from "node:console";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", appRouter);

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectToDb();
    app.listen(config.PORT, () => {
      console.log(`app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error(`Server startup failed: ${error}`);
  }
};

startServer();

process.on(`SIGINT`, async (): Promise<void> => {
  await closeConnectionToDb();
  process.exit(0);
});
