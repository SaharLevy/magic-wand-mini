import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import type { IOption } from "../../../schema/schemaTypes";
import { he } from "../../../../shared/constants/i18";
import { OptionRow, OtherInput } from "./RadioAnswer.styles";

interface RadioAnswerProps {
  options: IOption[];
  option: string;
  otherText?: string;
  onChange: (patch: { option?: string; otherText?: string }) => void;
}

const OTHER = "__other__";

const RadioAnswer = ({
  options,
  option,
  otherText,
  onChange,
}: RadioAnswerProps) => {
  const isOtherSelected = otherText !== undefined;

  const selectOption = (value: string) => {
    if (value === OTHER) {
      onChange({ option: "", otherText: "" });
    } else {
      onChange({ option: value, otherText: undefined });
    }
  };

  return (
    <RadioGroup
      value={isOtherSelected ? OTHER : option}
      onChange={(e) => selectOption(e.target.value)}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.order}
          value={option.text}
          control={<Radio />}
          label={option.text}
        />
      ))}

      <OptionRow>
        <FormControlLabel
          value={OTHER}
          control={<Radio />}
          label={he.instance.creation.other}
        />
        {isOtherSelected && (
          <OtherInput
            value={otherText ?? ""}
            onChange={(e) => onChange({ otherText: e.target.value })}
          />
        )}
      </OptionRow>
    </RadioGroup>
  );
};

export default RadioAnswer;
