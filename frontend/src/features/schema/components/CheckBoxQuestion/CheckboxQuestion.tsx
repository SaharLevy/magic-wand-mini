import { useState } from "react";
import {
  CheckboxIcon,
  OptionContainer,
  OptionsContainer,
} from "./CheckBoxQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const CheckboxQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>([]);

  return !options.length ? (
    <div>
      <OptionContainer>
        <CheckboxIcon /> {"אפשרות 1"}
      </OptionContainer>
    </div>
  ) : (
    <div>
      <OptionsContainer>
        {options.map((option) => (
          <OptionContainer key={option}>
            <CheckboxIcon /> {option}
          </OptionContainer>
        ))}
      </OptionsContainer>
    </div>
  );
};

export default CheckboxQuestion;
