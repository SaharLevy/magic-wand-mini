export enum QuestionTypes {
  SHORT_TEXT = "SHORT_TEXT",
  PARAGRAPH = "PARAGRAPH",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
  LINEAR_SCALE = "LINEAR_SCALE",
  RADIO_TABLE = "RADIO_TABLE",
  CHECKBOX_TABLE = "CHECKBOX_TABLE",
  DATE = "DATE",
  TIME = "TIME",
}

export enum SchemaStatus {
  Draft = "Draft",
  Published = "Published",
}

export interface IOption {
  text: string;
  order: number;
}

export interface IBaseQuestion {
  _id: string;
  title: string;
  description?: string;
  required: boolean;
  order: number;
}

type IShortTextQuestion = { type: QuestionTypes.SHORT_TEXT };
type IParagraphQuestion = { type: QuestionTypes.PARAGRAPH };
type IRadioQuestion = { type: QuestionTypes.RADIO; options: IOption[] };
type ICheckboxQuestion = { type: QuestionTypes.CHECKBOX; options: IOption[] };
type IDropdownQuestion = { type: QuestionTypes.DROPDOWN; options: IOption[] };
type ILinearScaleQuestion = {
  type: QuestionTypes.LINEAR_SCALE;
  scaleMin: number;
  scaleMax: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
};
type IRadioTableQuestion = {
  type: QuestionTypes.RADIO_TABLE;
  rows: string[];
  columns: string[];
};
type ICheckboxTableQuestion = {
  type: QuestionTypes.CHECKBOX_TABLE;
  rows: string[];
  columns: string[];
};
type IDateQuestion = { type: QuestionTypes.DATE; date?: string };
type ITimeQuestion = { type: QuestionTypes.TIME; time?: string };

export type IQuestion = (
  | IShortTextQuestion
  | IParagraphQuestion
  | IRadioQuestion
  | ICheckboxQuestion
  | IDropdownQuestion
  | ILinearScaleQuestion
  | IRadioTableQuestion
  | ICheckboxTableQuestion
  | IDateQuestion
  | ITimeQuestion
) &
  IBaseQuestion;

export interface ISection {
  _id: string;
  title: string;
  description?: string;
  order: number;
  questions: IQuestion[];
}

export interface ISchema {
  _id: string;
  title: string;
  description?: string;
  status: SchemaStatus;
  createdBy: string;
  assignedUsers: string[];
  sections: ISection[];
}

export type ISchemaUpdate = {
  title?: string;
  description?: string;
  assignedUsers?: string[];
  status?: SchemaStatus;
};

export type ISectionUpdate = {
  title?: string;
  description?: string;
  order?: number;
};

export type IQuestionUpdate = Partial<IQuestion>;
