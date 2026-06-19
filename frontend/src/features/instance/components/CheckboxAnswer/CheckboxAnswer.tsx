import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import type { IOption } from "../../../schema/schemaTypes";
import { he } from "../../../../shared/constants/i18";
import { OptionRow, OtherInput } from "./CheckboxAnswer.styles";

interface CheckboxAnswerProps {
  options: IOption[];
  selectedOptions: string[];
  otherText?: string;
  onChange: (patch: { options?: string[]; otherText?: string }) => void;
}

const CheckboxAnswer = ({
  options,
  selectedOptions,
  otherText,
  onChange,
}: CheckboxAnswerProps) => {
  const isOtherChecked = otherText !== undefined;

  const toggleOption = (text: string, checked: boolean) => {
    const newOptions = checked
      ? [...selectedOptions, text]
      : selectedOptions.filter((option) => option !== text);
    onChange({ options: newOptions });
  };

  const toggleOther = (checked: boolean) => {
    onChange({ otherText: checked ? "" : undefined });
  };

  return (
    <FormGroup>
      {options.map((option) => (
        <FormControlLabel
          key={option.order}
          control={
            <Checkbox
              checked={selectedOptions.includes(option.text)}
              onChange={(e) => toggleOption(option.text, e.target.checked)}
            />
          }
          label={option.text}
        />
      ))}

      <OptionRow>
        <FormControlLabel
          control={
            <Checkbox
              checked={isOtherChecked}
              onChange={(e) => toggleOther(e.target.checked)}
            />
          }
          label={he.instance.creation.other}
        />
        {isOtherChecked && (
          <OtherInput
            value={otherText ?? ""}
            onChange={(e) => onChange({ otherText: e.target.value })}
          />
        )}
      </OptionRow>
    </FormGroup>
  );
};

export default CheckboxAnswer;
