import RadioTableQuestionActive from "./CheckboxTableQuestionActive/CheckboxTableQuestionActive";
import RadioTableQuestionNotActive from "./CheckboxTableQuestionNotActive/CheckboxTableQuestionNotActive";

interface QuestionCardProps {
  isActive: boolean;
  rows: string[];
  columns: string[];
  onRowsChange: (rows: string[]) => void;
  onColumnsChange: (columns: string[]) => void;
}

const CheckboxTableQuestion = ({
  isActive,
  rows,
  columns,
  onRowsChange,
  onColumnsChange,
}: QuestionCardProps) => {
  return !isActive ? (
    <RadioTableQuestionNotActive rowsOptions={rows} colsOptions={columns} />
  ) : (
    <RadioTableQuestionActive
      rowsOptions={rows}
      colsOptions={columns}
      onRowsChange={onRowsChange}
      onColumnsChange={onColumnsChange}
    />
  );
};

export default CheckboxTableQuestion;
