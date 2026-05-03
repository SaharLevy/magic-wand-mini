import { useState } from "react";
import {
  AddOption,
  OptionContainer,
  OptionsContainer,
  RadioIcon,
} from "./RadioQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const RadioQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(["Asda"]);

  const addOptionHandler = () => {
    const newOption = `אפשרות ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  return !options.length ? (
    <div>
      <OptionsContainer>
        <OptionContainer>
          <RadioIcon /> {"אפשרות 1"}
        </OptionContainer>
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </div>
  ) : (
    <div>
      <OptionsContainer>
        {options.map((option) => (
          <OptionContainer key={option}>
            <RadioIcon /> {option}
          </OptionContainer>
        ))}
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>{" "}
      </OptionsContainer>
    </div>
  );
};

export default RadioQuestion;
