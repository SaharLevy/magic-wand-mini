import { useState } from "react";
import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import QuestionHeader, {
  type QuestionType,
} from "../../../../shared/components/QuestionHeader/QuestionHeader";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const RadioQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
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
        <div></div>
      )}
    </CardContainer>
  );
};

export default RadioQuestion;
