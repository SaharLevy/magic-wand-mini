import { MenuItem } from "@mui/material";
import type { IOption } from "../../../schema/schemaTypes";
import { he } from "../../../../shared/constants/i18";
import { DropdownSelect } from "./DropdownAnswer.styles";

interface DropdownAnswerProps {
  options: IOption[];
  option: string;
  onChange: (patch: { option?: string }) => void;
}

const DropdownAnswer = ({ options, option, onChange }: DropdownAnswerProps) => {
  return (
    <DropdownSelect
      value={option}
      displayEmpty
      onChange={(e) => onChange({ option: e.target.value as string })}
      renderValue={(selected) =>
        selected
          ? (selected as string)
          : he.instance.creation.dropdownPlaceholder
      }
    >
      {options.map((option) => (
        <MenuItem key={option.order} value={option.text}>
          {option.text}
        </MenuItem>
      ))}
    </DropdownSelect>
  );
};

export default DropdownAnswer;
