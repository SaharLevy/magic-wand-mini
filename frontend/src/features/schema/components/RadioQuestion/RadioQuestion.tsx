import { useState } from "react";
import {
  AddOption,
  OptionContainer,
  OptionInput,
  OptionsContainer,
  RadioIcon,
} from "./RadioQuestion.styles";
import { he } from "../../../../shared/constants/i18";

interface QuestionCardProps {
  isActive: boolean;
}

const RadioQuestion = ({ isActive }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>(["אפשרות 1"]);

  //i have some duplicates between components will take care of it later.
  const addOptionHandler = () => {
    const newOption = `${he.schema.creation.option} ${options.length + 1}`;
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
          <AddOption onClick={addOptionHandler}>
            {he.schema.creation.addOption}
          </AddOption>
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
          <AddOption onClick={addOptionHandler}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default RadioQuestion;
