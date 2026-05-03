import { useState } from "react";
import type { QuestionType } from "../../../../shared/components/QuestionHeader/QuestionHeader";
import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import QuestionHeader from "../../../../shared/components/QuestionHeader/QuestionHeader";
import TextQuestion from "../TextQuestion/TextQuestion";
import { ViewTitle } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";
import RadioQuestion from "../RadioQuestion/RadioQuestion";
import CheckboxQuestion from "../CheckBoxQuestion/CheckboxQuestion";
import { CheckboxIcon } from "../CheckBoxQuestion/CheckBoxQuestion.styles";

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
                isActive={activeCardId === "q1"}
                onActivate={() => onCardClick("q1")}
                isParagraph={false}
                questionType={"short"}
              />
            );
          case "paragraph":
            return (
              <TextQuestion
                isActive={activeCardId === "q2"}
                onActivate={() => onCardClick("q2")}
                isParagraph={true}
                questionType={"paragraph"}
              />
            );
          case "multipleChoice":
            return (
              <RadioQuestion
                isActive={activeCardId === "q3"}
                onActivate={() => onCardClick("q3")}
              />
            );
          case "checkboxes":
            return (
              <CheckboxQuestion
                isActive={activeCardId === "q4"}
                onActivate={() => onCardClick("q4")}
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
