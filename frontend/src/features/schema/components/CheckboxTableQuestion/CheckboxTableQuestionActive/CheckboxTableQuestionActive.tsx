import type { Dispatch, SetStateAction } from "react";
import {
  AddOption,
  OptionContainer,
  OptionInput,
  OptionsContainer,
} from "../../RadioQuestion/RadioQuestion.styles";
import {
  DeleteButton,
  NumberContainer,
  RowsColsContainer,
} from "../CheckboxTableQuestion.styles";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { CheckboxIcon } from "../../CheckBoxQuestion/CheckBoxQuestion.styles";

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

const CheckboxTableQuestionActive = ({
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
        <OptionContainer>
          <Typography variant="body2" noWrap>
            {"שורות"}
          </Typography>
        </OptionContainer>
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
        <OptionContainer>
          <Typography variant="body2" noWrap>
            {"עמודות"}
          </Typography>
        </OptionContainer>
        {colsOptions.map((col, index) => (
          <OptionContainer key={col}>
            <CheckboxIcon />
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
          <CheckboxIcon />
          <AddOption onClick={addColOptionHandler}>{"הוספת אפשרות"}</AddOption>
        </OptionContainer>
      </OptionsContainer>
    </RowsColsContainer>
  );
};

export default CheckboxTableQuestionActive;
