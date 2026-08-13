import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { he } from "../../../../shared/constants/i18";
import {
  addItem,
  removeItem,
  updateItem,
} from "../BaseQuestion/QuestionsHelpers";
import {
  AddOption,
  OptionContainer,
  OptionInput,
  OptionsContainer,
} from "../RadioQuestion/RadioQuestion.styles";
import { DeleteButton } from "./OptionsList.styles";

interface OptionsListProps {
  label: string;
  options: string[];
  onChange: (next: string[]) => void;
  renderLeading: (index: number) => ReactNode;
}

const OptionsList = ({
  label,
  options,
  onChange,
  renderLeading,
}: OptionsListProps) => {
  return (
    <OptionsContainer>
      <OptionContainer>
        <Typography variant="body2" noWrap>
          {label}
        </Typography>
      </OptionContainer>
      {options.map((option, index) => (
        <OptionContainer key={index}>
          {renderLeading(index)}
          <OptionInput
            fullWidth
            multiline
            defaultValue={option}
            onBlur={(e) => onChange(updateItem(options, index, e.target.value))}
          />
          <DeleteButton onClick={() => onChange(removeItem(options, index))}>
            <CloseIcon />
          </DeleteButton>
        </OptionContainer>
      ))}
      <OptionContainer>
        {renderLeading(options.length)}
        <AddOption onClick={() => onChange(addItem(options))}>
          {he.schema.creation.addOption}
        </AddOption>
      </OptionContainer>
    </OptionsContainer>
  );
};

export default OptionsList;
