import { useState } from "react";
import type { QuestionType } from "../../../../shared/components/QuestionHeader/QuestionHeader";
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

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
  activeCardId: string | null;
  onCardClick: (cardId: string) => void;
}

const BaseQuestion = ({
  isActive,
  onActivate,
  activeCardId,
  onCardClick,
}: QuestionCardProps) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("short");

  return (
    <CardContainer isActive={isActive} onClick={onActivate}>
      {isActive ? (
        <QuestionHeader
          questionText={questionText}
          onQuestionChange={setQuestionText}
          questionType={questionType}
          onTypeChange={setQuestionType}
        />
      ) : (
        <ViewTitle>{questionText || "שאלה"}</ViewTitle>
      )}
      {(() => {
        switch (questionType) {
          case "short":
            return (
              <TextQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q1")}
                isParagraph={false}
                questionType={"short"}
              />
            );
          case "paragraph":
            return (
              <TextQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q2")}
                isParagraph={true}
                questionType={"paragraph"}
              />
            );
          case "multipleChoice":
            return (
              <RadioQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q3")}
              />
            );
          case "checkboxes":
            return (
              <CheckboxQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q4")}
              />
            );
          case "dropdown":
            return (
              <DropdownQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q5")}
              />
            );
          case "linearScale":
            return (
              <LinearScaleQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q6")}
              />
            );
          case "radioTable":
            return (
              <RadioTableQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q7")}
              />
            );
          case "checkboxTable":
            return (
              <CheckboxTableQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q8")}
              />
            );
          case "date":
            return (
              <DateQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q8")}
              />
            );
          case "time":
            return (
              <TimeQuestion
                isActive={isActive}
                onActivate={() => onCardClick("q8")}
              />
            );
          default:
            return null;
        }
      })()}
    </CardContainer>
  );
};

export default BaseQuestion;
