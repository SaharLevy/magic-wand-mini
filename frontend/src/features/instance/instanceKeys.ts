export const instanceKeys = {
  all: ["instances"] as const,
  list: (userId: string) => ["instances", userId] as const,
  detail: (instanceId: string) => ["instance", instanceId] as const,
};
