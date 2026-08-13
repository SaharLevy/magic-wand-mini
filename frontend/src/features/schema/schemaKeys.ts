export const schemaKeys = {
  all: ["schemas"] as const,
  list: (userId: string) => ["schemas", userId] as const,
  detail: (schemaId: string) => ["schema", schemaId] as const,
};
