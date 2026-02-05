import env from "env-var";

const config = {
  PORT: env.get("PORT").default("3000").asPortNumber(),
  CONNECTION_STRING: env
    .get("CONNECTION_STRING")
    .default("mongodb://localhost:27017")
    .asString(),
  DB_NAME: env.get("DB_NAME").default("MAGIC_WAND_MINI").asString(),
  SCHEMA_DISCRIMINATOR_KEY: "type",
  ERRORS_TEXT: {
    SCHEMA_NOT_FOUND: "Schema not found",
  },
};

export default config;
