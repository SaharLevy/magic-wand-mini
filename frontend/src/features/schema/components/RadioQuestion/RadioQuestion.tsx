import { useState } from "react";
import {
  OptionContainer,
  OptionsContainer,
  RadioIcon,
} from "./RadioQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
  questionType: "";
}

const RadioQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>([]);

  return !options.length ? (
    <div>
      <OptionContainer>
        <RadioIcon /> {"אפשרות 1"}
      </OptionContainer>
    </div>
  ) : (
    <div>
      <OptionsContainer>
        {options.map((option) => (
          <OptionContainer key={option}>
            <RadioIcon /> {option}
          </OptionContainer>
        ))}
      </OptionsContainer>
    </div>
  );
};

export default RadioQuestion;
