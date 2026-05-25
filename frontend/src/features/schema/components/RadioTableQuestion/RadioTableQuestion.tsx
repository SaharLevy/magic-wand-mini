import { useState } from "react";
import RadioTableQuestionActive from "./RadioTableQuestionActive/RadioTableQuestionActive";
import RadioTableQuestionNotActive from "./RadioTableQuestionNotActive/RadioTableQuestionNotActive";
import { he } from "../../../../shared/constants/i18";

interface QuestionCardProps {
  isActive: boolean;
}

const DEFAULT_VALUE = "אפשרות 1";

const RadioTableQuestion = ({ isActive }: QuestionCardProps) => {
  const [rowsOptions, setRowsOptions] = useState<string[]>([DEFAULT_VALUE]);
  const [colsOptions, setColsOptions] = useState<string[]>([DEFAULT_VALUE]);

  const addRowOptionHandler = () => {
    setRowsOptions((prev) => [
      ...prev,
      `${he.schema.creation.option} ${prev.length + 1}`,
    ]);
  };

  const addColOptionHandler = () => {
    setColsOptions((prev) => [
      ...prev,
      `${he.schema.creation.option} ${prev.length + 1}`,
    ]);
  };

  const removeRowHandler = (index: number) => {
    setRowsOptions((prev) => prev.filter((_, i) => i !== index));
  };
  const removeColHandler = (index: number) => {
    setColsOptions((prev) => prev.filter((_, i) => i !== index));
  };

  return !isActive ? (
    <RadioTableQuestionNotActive
      rowsOptions={rowsOptions}
      colsOptions={colsOptions}
    />
  ) : (
    <RadioTableQuestionActive
      rowsOptions={rowsOptions}
      colsOptions={colsOptions}
      addRowOptionHandler={addRowOptionHandler}
      addColOptionHandler={addColOptionHandler}
      removeRowHandler={removeRowHandler}
      removeColHandler={removeColHandler}
      setRowsOptions={setRowsOptions}
      setColsOptions={setColsOptions}
    />
  );
};

export default RadioTableQuestion;
