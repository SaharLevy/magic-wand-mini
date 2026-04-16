import { useState } from "react";
import type { QuestionType } from "../../../../shared/components/QuestionHeader/QuestionHeader";
import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import QuestionHeader from "../../../../shared/components/QuestionHeader/QuestionHeader";
import { DottedLine, DottedPlaceholder } from "./TextQuestion.styles";
import { ViewTitle } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const TextQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("short");

  return (
    <CardContainer isActive={isActive} onClick={onActivate}>
      {isActive ? (
        <>
          <QuestionHeader
            questionText={questionText}
            onQuestionChange={setQuestionText}
            questionType={questionType}
            onTypeChange={setQuestionType}
          />
          <DottedPlaceholder isParagraph={questionType === "paragraph"}>
            {questionType === "short"
              ? "טקסט של תשובה קצרה"
              : "טקסט של תשובה ארוכה"}
          </DottedPlaceholder>
          <DottedLine />
        </>
      ) : (
        <div>
          <ViewTitle>{questionText || "שאלה"}</ViewTitle>
          <DottedPlaceholder isParagraph={questionType === "paragraph"}>
            {questionType === "short"
              ? "טקסט של תשובה קצרה"
              : "טקסט של תשובה ארוכה"}
          </DottedPlaceholder>
        </div>
      )}
    </CardContainer>
  );
};

export default TextQuestion;
