import { useState } from "react";
import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import QuestionHeader, {
  type QuestionType,
} from "../../../../shared/components/QuestionHeader/QuestionHeader";
import { ViewTitle } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";
import {
  OptionContainer,
  OptionsContainer,
  RadioIcon,
} from "./RadioQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const RadioQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("short");
  const [options, setOptions] = useState<[]>([]);

  return (
    <CardContainer isActive={isActive} onClick={onActivate}>
      {isActive ? (
        <QuestionHeader
          questionText={questionText}
          onQuestionChange={setQuestionText}
          questionType={questionType}
          onTypeChange={setQuestionType}
        />
      ) : !options.length ? (
        <div>
          <ViewTitle>{questionText || "שאלה"}</ViewTitle>
          <OptionContainer>
            <RadioIcon /> {"אפשרות 1"}
          </OptionContainer>
        </div>
      ) : (
        <div>
          <ViewTitle>{questionText || "שאלה"}</ViewTitle>
          <OptionsContainer>
            {options.map((option) => (
              <OptionContainer key={option}>
                <RadioIcon /> {option}
              </OptionContainer>
            ))}
          </OptionsContainer>
        </div>
      )}
    </CardContainer>
  );
};

export default RadioQuestion;
