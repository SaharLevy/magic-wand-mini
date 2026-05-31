import RadioTableQuestionActive from "./RadioTableQuestionActive/RadioTableQuestionActive";
import RadioTableQuestionNotActive from "./RadioTableQuestionNotActive/RadioTableQuestionNotActive";

interface RadioTableQuestionProps {
  isActive: boolean;
  rows: string[];
  columns: string[];
  onRowsChange: (rows: string[]) => void;
  onColumnsChange: (columns: string[]) => void;
}

const RadioTableQuestion = ({
  isActive,
  rows,
  columns,
  onRowsChange,
  onColumnsChange,
}: RadioTableQuestionProps) => {
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

export default RadioTableQuestion;
