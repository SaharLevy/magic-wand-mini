import {
  AddOption,
  OptionContainer,
  OptionInput,
  OptionsContainer,
  RadioIcon,
} from "./RadioQuestion.styles";
import { he } from "../../../../shared/constants/i18";
import type { IOption } from "../../schemaTypes";
import { addOption, updateOption } from "../BaseQuestion/QuestionsHelpers";

interface QuestionCardProps {
  isActive: boolean;
  options: IOption[];
  onChange: (options: IOption[]) => void;
}

const RadioQuestion = ({ isActive, options, onChange }: QuestionCardProps) => {
  return !isActive ? (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={index}>
            <RadioIcon />
            {option.text}
          </OptionContainer>
        ))}
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={() => onChange(addOption(options))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={index}>
            <RadioIcon />
            <OptionInput
              fullWidth
              multiline
              defaultValue={option.text}
              onBlur={(e) =>
                onChange(updateOption(options, index, e.target.value))
              }
            />
          </OptionContainer>
        ))}
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={() => onChange(addOption(options))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default RadioQuestion;
