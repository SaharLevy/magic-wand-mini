import { RowsColsContainer } from "../CheckboxTableQuestion.styles";
import { CheckboxIcon } from "../../CheckBoxQuestion/CheckBoxQuestion.styles";
import { he } from "../../../../../shared/constants/i18";
import OptionsList from "../../OptionsList/OptionsList";
import { NumberContainer } from "../../OptionsList/OptionsList.styles";

interface CheckboxTableQuestionActiveProps {
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
}: CheckboxTableQuestionActiveProps) => {
  return (
    <RowsColsContainer>
      <OptionsList
        label={he.schema.creation.rows}
        options={rowsOptions}
        onChange={onRowsChange}
        renderLeading={(index) => (
          <NumberContainer>{`${index + 1}.`}</NumberContainer>
        )}
      />
      <OptionsList
        label={he.schema.creation.cols}
        options={colsOptions}
        onChange={onColumnsChange}
        renderLeading={() => <CheckboxIcon />}
      />
    </RowsColsContainer>
  );
};

export default CheckboxTableQuestionActive;
