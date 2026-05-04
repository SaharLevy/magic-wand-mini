import { useState } from "react";
import {
  AddOption,
  OptionContainer,
  OptionInput,
  OptionsContainer,
  RadioIcon,
} from "./RadioQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const RadioQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(["אפשרות 1"]);

  const addOptionHandler = () => {
    const newOption = `אפשרות ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  return !isActive ? (
    <>
      <OptionsContainer>
        {options.map((option) => (
          <OptionContainer key={option}>
            <RadioIcon />
            {option}
          </OptionContainer>
        ))}
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={option}>
            <RadioIcon />
            <OptionInput
              fullWidth
              multiline
              defaultValue={option}
              onBlur={(e) => {
                const updated = [...options];
                updated[index] = e.target.value;
                setOptions(updated);
              }}
            />
          </OptionContainer>
        ))}
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default RadioQuestion;
