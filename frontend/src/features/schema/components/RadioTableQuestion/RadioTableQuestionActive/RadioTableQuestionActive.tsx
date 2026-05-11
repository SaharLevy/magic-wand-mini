import type { Dispatch, SetStateAction } from "react";
import { NumberContainer } from "../../DropdownQuestion/DropdownQuestion.style";
import {
  AddOption,
  OptionContainer,
  OptionInput,
  OptionsContainer,
  RadioIcon,
} from "../../RadioQuestion/RadioQuestion.styles";
import { DeleteButton, RowsColsContainer } from "../RadioTableQuestion.styles";
import CloseIcon from "@mui/icons-material/Close";

interface QuestionCardProps {
  rowsOptions: string[];
  colsOptions: string[];
  addRowOptionHandler: () => void;
  addColOptionHandler: () => void;
  removeRowHandler: (index: number) => void;
  removeColHandler: (index: number) => void;
  setRowsOptions: Dispatch<SetStateAction<string[]>>;
  setColsOptions: Dispatch<SetStateAction<string[]>>;
}

const RadioTableQuestionActive = ({
  rowsOptions,
  colsOptions,
  addRowOptionHandler,
  addColOptionHandler,
  removeRowHandler,
  removeColHandler,
  setRowsOptions,
  setColsOptions,
}: QuestionCardProps) => {
  return (
    <RowsColsContainer>
      <OptionsContainer>
        {rowsOptions.map((row, index) => (
          <OptionContainer key={row}>
            <NumberContainer>{`${index + 1}.`}</NumberContainer>
            <OptionInput
              fullWidth
              multiline
              defaultValue={row}
              onBlur={(e) => {
                const updated = [...rowsOptions];
                updated[index] = e.target.value;
                setRowsOptions(updated);
              }}
            />
            <DeleteButton onClick={() => removeRowHandler(index)}>
              <CloseIcon />
            </DeleteButton>
          </OptionContainer>
        ))}
        <OptionContainer>
          <NumberContainer>{`${rowsOptions.length + 1}.`}</NumberContainer>
          <AddOption onClick={addRowOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>

      <OptionsContainer>
        {colsOptions.map((col, index) => (
          <OptionContainer key={col}>
            <RadioIcon />
            <OptionInput
              fullWidth
              multiline
              defaultValue={col}
              onBlur={(e) => {
                const updated = [...colsOptions];
                updated[index] = e.target.value;
                setColsOptions(updated);
              }}
            />
            <DeleteButton onClick={() => removeColHandler(index)}>
              <CloseIcon />
            </DeleteButton>
          </OptionContainer>
        ))}
        <OptionContainer>
          <RadioIcon />
          <AddOption onClick={addColOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </RowsColsContainer>
  );
};

export default RadioTableQuestionActive;
