import { useState } from "react";
import {
  AddOption,
  OptionInput,
  OptionsContainer,
} from "../RadioQuestion/RadioQuestion.styles";
import { OptionContainer } from "./DropdownQuestion.style";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const DropdownQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(["אפשרות 1"]);

  const addOptionHandler = () => {
    const newOption = `אפשרות ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  return !isActive ? (
    <OptionsContainer>
      {options.map((option, index) => (
        <OptionContainer key={option}>
          {`${index}.`}
          {option}
        </OptionContainer>
      ))}
    </OptionsContainer>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={option}>
            {`${index}.`}
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
          <AddOption onClick={addOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default DropdownQuestion;
