import CheckboxTableQuestionActive from "./CheckboxTableQuestionActive/CheckboxTableQuestionActive";
import CheckboxTableQuestionNotActive from "./CheckboxTableQuestionNotActive/CheckboxTableQuestionNotActive";

interface CheckboxTableQuestionProps {
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
}: CheckboxTableQuestionProps) => {
  return !isActive ? (
    <CheckboxTableQuestionNotActive rowsOptions={rows} colsOptions={columns} />
  ) : (
    <CheckboxTableQuestionActive
      rowsOptions={rows}
      colsOptions={columns}
      onRowsChange={onRowsChange}
      onColumnsChange={onColumnsChange}
    />
  );
};

export default CheckboxTableQuestion;
