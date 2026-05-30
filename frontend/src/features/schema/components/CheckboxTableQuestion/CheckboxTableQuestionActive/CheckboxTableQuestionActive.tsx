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
import { he } from "../../../../../shared/constants/i18";
import {
  addItem,
  removeItem,
  updateItem,
} from "../../BaseQuestion/QuestionsHelpers";

interface QuestionCardProps {
  rowsOptions: string[];
  colsOptions: string[];
  onRowsChange: (rows: string[]) => void;
  onColumnsChange: (columns: string[]) => void;
}

const CheckboxTableQuestionActive = ({
  rowsOptions,
  colsOptions,
  onRowsChange,
  onColumnsChange,
}: QuestionCardProps) => {
  return (
    <RowsColsContainer>
      <OptionsContainer>
        <OptionContainer>
          <Typography variant="body2" noWrap>
            {he.schema.creation.rows}
          </Typography>
        </OptionContainer>
        {rowsOptions.map((row, index) => (
          <OptionContainer key={index}>
            <NumberContainer>{`${index + 1}.`}</NumberContainer>
            <OptionInput
              fullWidth
              multiline
              defaultValue={row}
              onBlur={(e) =>
                onRowsChange(updateItem(rowsOptions, index, e.target.value))
              }
            />
            <DeleteButton
              onClick={() => onRowsChange(removeItem(rowsOptions, index))}
            >
              <CloseIcon />
            </DeleteButton>
          </OptionContainer>
        ))}
        <OptionContainer>
          <NumberContainer>{`${rowsOptions.length + 1}.`}</NumberContainer>
          <AddOption onClick={() => onRowsChange(addItem(rowsOptions))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>

      <OptionsContainer>
        <OptionContainer>
          <Typography variant="body2" noWrap>
            {he.schema.creation.cols}
          </Typography>
        </OptionContainer>
        {colsOptions.map((col, index) => (
          <OptionContainer key={index}>
            <CheckboxIcon />
            <OptionInput
              fullWidth
              multiline
              defaultValue={col}
              onBlur={(e) =>
                onColumnsChange(updateItem(colsOptions, index, e.target.value))
              }
            />
            <DeleteButton
              onClick={() => onColumnsChange(removeItem(colsOptions, index))}
            >
              <CloseIcon />
            </DeleteButton>
          </OptionContainer>
        ))}
        <OptionContainer>
          <CheckboxIcon />
          <AddOption onClick={() => onColumnsChange(addItem(colsOptions))}>
            {he.schema.creation.addOption}
          </AddOption>
        </OptionContainer>
      </OptionsContainer>
    </RowsColsContainer>
  );
};

export default CheckboxTableQuestionActive;
