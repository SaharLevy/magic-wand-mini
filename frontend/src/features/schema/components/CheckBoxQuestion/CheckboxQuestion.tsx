import { useState } from "react";
import {
  CheckboxIcon,
  OptionContainer,
  OptionsContainer,
} from "./CheckBoxQuestion.styles";
import { AddOption, OptionInput } from "../RadioQuestion/RadioQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const CheckboxQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
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
            <CheckboxIcon />
            {option}
          </OptionContainer>
        ))}
        <OptionContainer>
          <CheckboxIcon />
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={option}>
            <CheckboxIcon />
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
          <CheckboxIcon />
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default CheckboxQuestion;
