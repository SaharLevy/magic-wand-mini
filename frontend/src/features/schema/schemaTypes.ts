import { QuestionTypes } from "../../shared/sharedTypes";

export const questionTypeDefaults: Record<QuestionTypes, Partial<IQuestion>> = {
  [QuestionTypes.SHORT_TEXT]: {},
  [QuestionTypes.PARAGRAPH]: {},
  [QuestionTypes.RADIO]: { options: [] },
  [QuestionTypes.CHECKBOX]: { options: [] },
  [QuestionTypes.DROPDOWN]: { options: [] },
  [QuestionTypes.LINEAR_SCALE]: { scaleMin: 1, scaleMax: 5 },
  [QuestionTypes.RADIO_TABLE]: { rows: [], columns: [] },
  [QuestionTypes.CHECKBOX_TABLE]: { rows: [], columns: [] },
  [QuestionTypes.DATE]: {},
  [QuestionTypes.TIME]: {},
};

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
export type IRadioQuestion = { type: QuestionTypes.RADIO; options: IOption[] };
export type ICheckboxQuestion = {
  type: QuestionTypes.CHECKBOX;
  options: IOption[];
};
export type IDropdownQuestion = {
  type: QuestionTypes.DROPDOWN;
  options: IOption[];
};
export type ILinearScaleQuestion = {
  type: QuestionTypes.LINEAR_SCALE;
  scaleMin: number;
  scaleMax: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
};
export type IRadioTableQuestion = {
  type: QuestionTypes.RADIO_TABLE;
  rows: string[];
  columns: string[];
};
export type ICheckboxTableQuestion = {
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
