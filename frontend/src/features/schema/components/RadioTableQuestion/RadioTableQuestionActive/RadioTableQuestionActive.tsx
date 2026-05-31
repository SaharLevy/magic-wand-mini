import { RadioIcon } from "../../RadioQuestion/RadioQuestion.styles";
import { RowsColsContainer } from "../RadioTableQuestion.styles";
import { he } from "../../../../../shared/constants/i18";
import OptionsList from "../../OptionsList/OptionsList";
import { NumberContainer } from "../../OptionsList/OptionsList.styles";

interface QuestionCardProps {
  rowsOptions: string[];
  colsOptions: string[];
  onRowsChange: (rows: string[]) => void;
  onColumnsChange: (columns: string[]) => void;
}

const RadioTableQuestionActive = ({
  rowsOptions,
  colsOptions,
  onRowsChange,
  onColumnsChange,
}: QuestionCardProps) => {
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
        renderLeading={() => <RadioIcon />}
      />
    </RowsColsContainer>
  );
};

export default RadioTableQuestionActive;
