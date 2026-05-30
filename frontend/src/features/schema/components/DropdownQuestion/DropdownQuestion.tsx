import {
  AddOption,
  OptionInput,
  OptionsContainer,
} from "../RadioQuestion/RadioQuestion.styles";
import { NumberContainer, OptionContainer } from "./DropdownQuestion.style";
import { he } from "../../../../shared/constants/i18";
import type { IOption } from "../../schemaTypes";
import { addOption, updateOption } from "../BaseQuestion/QuestionsHelpers";

interface QuestionCardProps {
  isActive: boolean;
  options: IOption[];
  onChange: (options: IOption[]) => void;
}

const DropdownQuestion = ({
  isActive,
  options,
  onChange,
}: QuestionCardProps) => {
  return !isActive ? (
    <OptionsContainer>
      {options.map((option, index) => (
        <OptionContainer key={index}>
          <NumberContainer>{`${index}.`}</NumberContainer>
          {option.text}
        </OptionContainer>
      ))}
    </OptionsContainer>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={index}>
            <NumberContainer>{`${index}.`}</NumberContainer>
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
          <NumberContainer>{`${options.length}.`}</NumberContainer>
          <AddOption onClick={() => onChange(addOption(options))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default DropdownQuestion;
