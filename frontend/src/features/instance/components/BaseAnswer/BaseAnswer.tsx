import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import { ViewTitle } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";
import { he } from "../../../../shared/constants/i18";
import { QuestionTypes } from "../../../../shared/sharedTypes";
import type { IAnswer } from "../../instanceTypes";
import TextAnswer from "../TextAnswer/TextAnswer";
import type {
  ICheckboxQuestion,
  ICheckboxTableQuestion,
  IDropdownQuestion,
  ILinearScaleQuestion,
  IQuestion,
  IRadioQuestion,
  IRadioTableQuestion,
} from "../../../schema/schemaTypes";
import RadioAnswer from "../RadioAnswer/RadioAnswer";
import CheckboxAnswer from "../CheckboxAnswer/CheckboxAnswer";
import DropdownAnswer from "../DropdownAnswer/DropdownAnswer";
import LinearScaleAnswer from "../LinearScaleAnswer/LinearScaleAnswer";
import RadioTableAnswer from "../RadioTableAnswer/RadioTableAnswer";
import CheckboxTableAnswer from "../CheckboxTableAnswer/CheckboxTableAnswer";
import DateAnswer from "../DateAnswer/DateAnswer";
import TimeAnswer from "../TimeAnswer/TimeAnswer";

interface BaseAnswerProps {
  question: IQuestion;
  answer: IAnswer;
  onChange: (patch: Partial<IAnswer>) => void;
}

const BaseAnswer = ({ question, answer, onChange }: BaseAnswerProps) => {
  return (
    <CardContainer>
      <ViewTitle>
        {question.title || he.schema.creation.baseQuestionDefaultText}
      </ViewTitle>

      {(() => {
        switch (answer.type) {
          case QuestionTypes.SHORT_TEXT:
            return (
              <TextAnswer
                isParagraph={false}
                value={answer.text}
                onChange={(text) => onChange({ text })}
              />
            );
          case QuestionTypes.PARAGRAPH:
            return (
              <TextAnswer
                isParagraph={true}
                value={answer.text}
                onChange={(text) => onChange({ text })}
              />
            );
          case QuestionTypes.RADIO:
            return (
              <RadioAnswer
                options={(question as IRadioQuestion).options}
                option={answer.option}
                otherText={answer.otherText}
                onChange={onChange}
              />
            );
          case QuestionTypes.CHECKBOX:
            return (
              <CheckboxAnswer
                options={(question as ICheckboxQuestion).options}
                selectedOptions={answer.options}
                otherText={answer.otherText}
                onChange={onChange}
              />
            );
          case QuestionTypes.DROPDOWN:
            return (
              <DropdownAnswer
                options={(question as IDropdownQuestion).options}
                option={answer.option}
                onChange={onChange}
              />
            );
          case QuestionTypes.LINEAR_SCALE:
            return (
              <LinearScaleAnswer
                scaleMin={(question as ILinearScaleQuestion).scaleMin}
                scaleMax={(question as ILinearScaleQuestion).scaleMax}
                scaleMinLabel={(question as ILinearScaleQuestion).scaleMinLabel}
                scaleMaxLabel={(question as ILinearScaleQuestion).scaleMaxLabel}
                scaleNumber={answer.scaleNumber}
                onChange={onChange}
              />
            );
          case QuestionTypes.RADIO_TABLE: {
            return (
              <RadioTableAnswer
                rows={(question as IRadioTableQuestion).rows}
                columns={(question as IRadioTableQuestion).columns}
                tableAnswers={answer.tableAnswers}
                onChange={onChange}
              />
            );
          }
          case QuestionTypes.CHECKBOX_TABLE: {
            return (
              <CheckboxTableAnswer
                rows={(question as ICheckboxTableQuestion).rows}
                columns={(question as ICheckboxTableQuestion).columns}
                tableAnswers={answer.tableAnswers}
                onChange={onChange}
              />
            );
          }
          case QuestionTypes.DATE:
            return <DateAnswer date={answer.date} onChange={onChange} />;
          case QuestionTypes.TIME:
            return <TimeAnswer time={answer.time} onChange={onChange} />;
          default:
            return null;
        }
      })()}
      {/* {isActive && (
        <QuestionFooter
          isRequired={question.required}
          onQuestionChange={(value) => onChange({ required: value })}
          questionDeleteHandler={onDelete}
        />
      )} */}
    </CardContainer>
  );
};

export default BaseAnswer;
