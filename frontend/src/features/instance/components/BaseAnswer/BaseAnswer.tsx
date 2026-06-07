import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import QuestionHeader from "../../../../shared/components/QuestionHeader/QuestionHeader";
import TextQuestion from "../TextQuestion/TextQuestion";
import { ViewTitle } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";
import RadioQuestion from "../RadioQuestion/RadioQuestion";
import CheckboxQuestion from "../CheckBoxQuestion/CheckboxQuestion";
import LinearScaleQuestion from "../LinearScaleQuestion/LinearScaleQuestion";
import DropdownQuestion from "../DropdownQuestion/DropdownQuestion";
import RadioTableQuestion from "../RadioTableQuestion/RadioTableQuestion";
import CheckboxTableQuestion from "../CheckboxTableQuestion/CheckboxTableQuestion";
import DateQuestion from "../DateQuestion/DateQuestion";
import TimeQuestion from "../TimeQuestion/TimeQuestion";
import { type IQuestion, type IQuestionUpdate } from "../../schemaTypes";
import { he } from "../../../../shared/constants/i18";
import QuestionFooter from "../../../../shared/components/QuestionFooter/QuestionFooter";
import { QuestionTypes } from "../../../../shared/sharedTypes";
import type { IAnswer } from "../../instanceTypes";

interface QuestionCardProps {
  answer: IAnswer;
  onActivate: (element: HTMLElement) => void;
  onChange: (patch: IQuestionUpdate) => void;
  onDelete: () => void;
}

const BaseQuestion = ({
  answer,
  isActive,
  onChange,
  onDelete,
}: QuestionCardProps) => {
  return (
    <CardContainer>
      <ViewTitle>
        {answer.title || he.schema.creation.baseQuestionDefaultText}
      </ViewTitle>

      {(() => {
        switch (answer.type) {
          case QuestionTypes.SHORT_TEXT:
            return (
              <TextQuestion
                isActive={isActive}
                isParagraph={false}
                questionType={"short"}
              />
            );
          case QuestionTypes.PARAGRAPH:
            return (
              <TextQuestion
                isActive={isActive}
                isParagraph={true}
                questionType={"paragraph"}
              />
            );
          case QuestionTypes.RADIO:
            return (
              <RadioQuestion
                isActive={isActive}
                options={question.options}
                onChange={(options) => onChange({ options })}
              />
            );
          case QuestionTypes.CHECKBOX:
            return (
              <CheckboxQuestion
                isActive={isActive}
                options={question.options}
                onChange={(options) => onChange({ options })}
              />
            );
          case QuestionTypes.DROPDOWN:
            return (
              <DropdownQuestion
                isActive={isActive}
                options={question.options}
                onChange={(options) => onChange({ options })}
              />
            );
          case QuestionTypes.LINEAR_SCALE:
            return (
              <LinearScaleQuestion
                isActive={isActive}
                scaleMin={question.scaleMin}
                scaleMax={question.scaleMax}
                scaleMinLabel={question.scaleMinLabel}
                scaleMaxLabel={question.scaleMaxLabel}
                onChange={onChange}
              />
            );
          case QuestionTypes.RADIO_TABLE:
            return (
              <RadioTableQuestion
                isActive={isActive}
                rows={question.rows}
                columns={question.columns}
                onRowsChange={(rows) => onChange({ rows })}
                onColumnsChange={(columns) => onChange({ columns })}
              />
            );
          case QuestionTypes.CHECKBOX_TABLE:
            return (
              <CheckboxTableQuestion
                isActive={isActive}
                rows={question.rows}
                columns={question.columns}
                onRowsChange={(rows) => onChange({ rows })}
                onColumnsChange={(columns) => onChange({ columns })}
              />
            );
          case QuestionTypes.DATE:
            return <DateQuestion isActive={isActive} />;
          case QuestionTypes.TIME:
            return <TimeQuestion isActive={isActive} />;
          default:
            return null;
        }
      })()}
      {isActive && (
        <QuestionFooter
          isRequired={question.required}
          onQuestionChange={(value) => onChange({ required: value })}
          questionDeleteHandler={onDelete}
        />
      )}
    </CardContainer>
  );
};

export default BaseQuestion;
