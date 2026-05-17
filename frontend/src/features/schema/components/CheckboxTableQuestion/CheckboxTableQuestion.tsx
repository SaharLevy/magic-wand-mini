import { useState } from "react";
import RadioTableQuestionActive from "./CheckboxTableQuestionActive/CheckboxTableQuestionActive";
import RadioTableQuestionNotActive from "./CheckboxTableQuestionNotActive/CheckboxTableQuestionNotActive";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const DEFAULT_VALUE = "אפשרות 1";

const CheckboxTableQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [rowsOptions, setRowsOptions] = useState<string[]>([DEFAULT_VALUE]);
  const [colsOptions, setColsOptions] = useState<string[]>([DEFAULT_VALUE]);

  const addRowOptionHandler = () => {
    setRowsOptions((prev) => [...prev, `אפשרות ${prev.length + 1}`]);
  };

  const addColOptionHandler = () => {
    setColsOptions((prev) => [...prev, `אפשרות ${prev.length + 1}`]);
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

export default CheckboxTableQuestion;
