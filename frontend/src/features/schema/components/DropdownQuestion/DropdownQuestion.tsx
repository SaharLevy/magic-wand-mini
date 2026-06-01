import {
  AddOption,
  OptionInput,
  OptionsContainer,
} from "../RadioQuestion/RadioQuestion.styles";
import { NumberContainer, OptionContainer } from "./DropdownQuestion.style";
import { he } from "../../../../shared/constants/i18";
import type { IOption } from "../../schemaTypes";
import { addOption, updateOption } from "../BaseQuestion/QuestionsHelpers";

interface DropdownQuestionProps {
  isActive: boolean;
  options: IOption[];
  onChange: (options: IOption[]) => void;
}

const DropdownQuestion = ({
  isActive,
  options,
  onChange,
}: DropdownQuestionProps) => {
  return !isActive ? (
    <OptionsContainer>
      {options.map((option, index) => (
        <OptionContainer key={index}>
          <NumberContainer>{`${index + 1}.`}</NumberContainer>
          {option.text}
        </OptionContainer>
      ))}
    </OptionsContainer>
  ) : (
    <>
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionContainer key={index}>
            <NumberContainer>{`${index + 1}.`}</NumberContainer>
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
          <NumberContainer>{`${options.length + 1}.`}</NumberContainer>
          <AddOption onClick={() => onChange(addOption(options))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </>
  );
};

export default DropdownQuestion;
