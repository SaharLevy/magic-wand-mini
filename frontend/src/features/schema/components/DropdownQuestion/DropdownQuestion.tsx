import { useState } from "react";
import {
  AddOption,
  OptionInput,
  OptionsContainer,
} from "../RadioQuestion/RadioQuestion.styles";
import { NumberContainer, OptionContainer } from "./DropdownQuestion.style";
import { he } from "../../../../shared/constants/i18";

interface QuestionCardProps {
  isActive: boolean;
}

const DropdownQuestion = ({ isActive }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(["אפשרות 1"]);

  const addOptionHandler = () => {
    const newOption = `${he.schema.creation.option} ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  return !isActive ? (
    <OptionsContainer>
      {options.map((option, index) => (
        <OptionContainer key={option}>
          <NumberContainer>{`${index}.`}</NumberContainer>
          {option}
        </OptionContainer>
      ))}
    </OptionsContainer>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={option}>
            <NumberContainer>{`${index}.`}</NumberContainer>
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
          <NumberContainer>{`${options.length}.`}</NumberContainer>
          <AddOption onClick={addOptionHandler}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default DropdownQuestion;
