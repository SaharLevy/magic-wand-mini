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
import {
  QuestionTypes,
  type IQuestion,
  type IQuestionUpdate,
} from "../../schemaTypes";
import { he } from "../../../../shared/constants/i18";
import QuestionFooter from "../../../../shared/components/QuestionFooter/QuestionFooter";

interface QuestionCardProps {
  question: IQuestion;
  isActive: boolean;
  onActivate: (element: HTMLElement) => void;
  onChange: (patch: IQuestionUpdate) => void;
}

const BaseQuestion = ({
  question,
  isActive,
  onActivate,
  onChange,
}: QuestionCardProps) => {
  return (
    <CardContainer
      isActive={isActive}
      onClick={(e) => onActivate(e.currentTarget)}
    >
      {isActive ? (
        <QuestionHeader
          questionText={question.title}
          onQuestionChange={(value) => onChange({ title: value })}
          questionType={question.type}
          onTypeChange={(type) => onChange({ type })}
        />
      ) : (
        <ViewTitle>
          {question.title || he.schema.creation.baseQuestionDefaultText}
        </ViewTitle>
      )}
      {(() => {
        switch (question.type) {
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
            return <RadioQuestion isActive={isActive} />;
          case QuestionTypes.CHECKBOX:
            return <CheckboxQuestion isActive={isActive} />;
          case QuestionTypes.DROPDOWN:
            return <DropdownQuestion isActive={isActive} />;
          case QuestionTypes.LINEAR_SCALE:
            return <LinearScaleQuestion isActive={isActive} />;
          case QuestionTypes.RADIO_TABLE:
            return <RadioTableQuestion isActive={isActive} />;
          case QuestionTypes.CHECKBOX_TABLE:
            return <CheckboxTableQuestion isActive={isActive} />;
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
        />
      )}
    </CardContainer>
  );
};

export default BaseQuestion;
