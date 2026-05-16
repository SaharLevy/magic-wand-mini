export enum SchemaStatus {
  Draft = "Draft",
  Published = "Published",
}

export interface ISchema {
  _id: string;
  title: string;
  description?: string;
  status: SchemaStatus;
  createdBy: string;
  assignedUsers: string[];
  sections: unknown[];
}
