import env from "env-var";

const config = {
  PORT: env.get("PORT").default("3000").required().asPortNumber(),
  CONNECTION_STRING: env
    .get("CONNECTION_STRING")
    .default("mongodb://localhost:27017")
    .required()
    .asString(),
  DB_NAME: env.get("DB_NAME").default("MAGIC_WAND_MINI").required().asString(),
};

export default config;
