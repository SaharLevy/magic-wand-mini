import { IAnswer, ISectionAnswer } from "../instance/types.js";
import {
  IQuestion,
  ISchema,
} from "../schema/types.js";
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
    case QuestionTypes.DROPDOWN:
      return { ...base, type, option: "" };
    case QuestionTypes.RADIO:
      return { ...base, type, option: "" };
    case QuestionTypes.CHECKBOX:
      return { ...base, type, options: [] };
    case QuestionTypes.LINEAR_SCALE:
      return { ...base, type };
    case QuestionTypes.RADIO_TABLE:
    case QuestionTypes.CHECKBOX_TABLE:
      return { ...base, type, tableAnswers: [] };
    case QuestionTypes.DATE:
      return { ...base, type, date: undefined };
    case QuestionTypes.TIME:
      return { ...base, type, time: undefined };
    default:
      throw new Error(`Question type not supported: ${type satisfies never}`);
  }
};

export const isAnswerIncomplete = (
  answer: IAnswer,
  question: IQuestion,
): boolean => {
  switch (answer.type) {
    case QuestionTypes.SHORT_TEXT:
    case QuestionTypes.PARAGRAPH:
      return !answer.text;
    case QuestionTypes.RADIO:
      return !answer.option && answer.otherText === undefined;
    case QuestionTypes.DROPDOWN:
      return !answer.option;
    case QuestionTypes.CHECKBOX:
      return answer.options.length === 0 && answer.otherText === undefined;
    case QuestionTypes.LINEAR_SCALE:
      return answer.scaleNumber === undefined;
    case QuestionTypes.RADIO_TABLE:
      if (question.type !== QuestionTypes.RADIO_TABLE) return true;
      return answer.tableAnswers.length < question.rows.length;
    case QuestionTypes.CHECKBOX_TABLE:
      if (question.type !== QuestionTypes.CHECKBOX_TABLE) return true;
      return (
        answer.tableAnswers.length < question.rows.length ||
        answer.tableAnswers.some((row) => row.columns.length === 0)
      );
    case QuestionTypes.DATE:
      return answer.date === undefined;
    case QuestionTypes.TIME:
      return answer.time === undefined;
    default:
      return true;
  }
};

export const getMissingRequiredQuestions = (
  sections: ISectionAnswer[],
  schema: ISchema,
): string[] => {
  const missing: string[] = [];

  schema.sections.forEach((schemaSection) => {
    const answerSection = sections.find(
      (section) => String(section.sectionId) === String(schemaSection._id),
    );

    schemaSection.questions.forEach((question) => {
      if (!question.required) return;

      const answer = answerSection?.answers.find(
        (answer) => String(answer.questionId) === String(question._id),
      );

      if (!answer || isAnswerIncomplete(answer, question))
        missing.push(String(question._id));
    });
  });

  return missing;
};
