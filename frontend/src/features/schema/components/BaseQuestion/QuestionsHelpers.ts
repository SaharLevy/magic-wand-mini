import { he } from "../../../../shared/constants/i18";
import {
  type IOption,
  questionTypeDefaults,
  type QuestionTypes,
  type IQuestion,
} from "../../schemaTypes";

export const addOption = (options: IOption[]): IOption[] => [
  ...options,
  {
    text: `${he.schema.creation.option} ${options.length + 1}`,
    order: options.length,
  },
];

export const updateOption = (
  options: IOption[],
  index: number,
  text: string,
): IOption[] =>
  options.map((option, i) => (i === index ? { ...option, text } : option));

export const addItem = (items: string[]): string[] => [
  ...items,
  `${he.schema.creation.option} ${items.length + 1}`,
];

export const updateItem = (
  items: string[],
  index: number,
  value: string,
): string[] => items.map((item, i) => (i === index ? value : item));

export const removeItem = (items: string[], index: number): string[] =>
  items.filter((_, i) => i !== index);

export const changeQuestionType = (
  question: IQuestion,
  type: QuestionTypes,
): IQuestion =>
  ({
    _id: question._id,
    title: question.title,
    description: question.description,
    required: question.required,
    order: question.order,
    type,
    ...questionTypeDefaults[type],
  }) as IQuestion;
