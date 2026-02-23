import { IAnswer } from "../instance/types.js";
import { MongoObjectId, QuestionTypes } from "../shared/types.js";

export const generateEmptyAnswer = (
  type: QuestionTypes,
  questionId: MongoObjectId,
): IAnswer => {
  const base = { questionId };
  switch (type) {
    case QuestionTypes.SHORT_TEXT:
    case QuestionTypes.PARAGRAPH:
      return { ...base, type, text: "" };
    case QuestionTypes.RADIO:
    case QuestionTypes.DROPDOWN:
      return { ...base, type, option: "" };
    case QuestionTypes.CHECKBOX:
      return { ...base, type, options: [] };
    case QuestionTypes.LINEAR_SCALE:
      return { ...base, type, scaleNumber: 0 };
    case QuestionTypes.RADIO_TABLE:
    case QuestionTypes.CHECKBOX_TABLE:
      return { ...base, type, tableAnswers: [] };
    case QuestionTypes.DATE:
      return { ...base, type, date: undefined };
    case QuestionTypes.TIME:
      return { ...base, type, time: undefined };
    default:
      throw new Error(`Question type not supported: ${type}`);
  }
};
