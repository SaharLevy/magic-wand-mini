import { useState } from "react";
import {
  CheckboxIcon,
  OptionContainer,
  OptionsContainer,
} from "./CheckBoxQuestion.styles";
import { AddOption, OptionInput } from "../RadioQuestion/RadioQuestion.styles";
import { he } from "../../../../shared/constants/i18";

const DEFAULT_VALUE = "אפשרות 1";

interface QuestionCardProps {
  isActive: boolean;
}

const CheckboxQuestion = ({ isActive }: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>([DEFAULT_VALUE]);

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
          <AddOption onClick={addOptionHandler}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default CheckboxQuestion;
