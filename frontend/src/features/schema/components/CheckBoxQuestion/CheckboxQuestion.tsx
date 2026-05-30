import {
  CheckboxIcon,
  OptionContainer,
  OptionsContainer,
} from "./CheckBoxQuestion.styles";
import { AddOption, OptionInput } from "../RadioQuestion/RadioQuestion.styles";
import { he } from "../../../../shared/constants/i18";
import type { IOption } from "../../schemaTypes";
import { addOption, updateOption } from "../BaseQuestion/QuestionsHelpers";

interface QuestionCardProps {
  isActive: boolean;
  options: IOption[];
  onChange: (options: IOption[]) => void;
}

const CheckboxQuestion = ({
  isActive,
  options,
  onChange,
}: QuestionCardProps) => {
  return !isActive ? (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={index}>
            <CheckboxIcon />
            {option.text}
          </OptionContainer>
        ))}
        <OptionContainer>
          <CheckboxIcon />
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
            <CheckboxIcon />
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
          <CheckboxIcon />
          <AddOption onClick={() => onChange(addOption(options))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default CheckboxQuestion;
