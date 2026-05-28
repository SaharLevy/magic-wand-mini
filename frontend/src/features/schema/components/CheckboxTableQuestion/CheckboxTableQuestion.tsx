import { useState } from "react";
import RadioTableQuestionActive from "./CheckboxTableQuestionActive/CheckboxTableQuestionActive";
import RadioTableQuestionNotActive from "./CheckboxTableQuestionNotActive/CheckboxTableQuestionNotActive";
import { he } from "../../../../shared/constants/i18";

interface QuestionCardProps {
  isActive: boolean;
}

const CheckboxTableQuestion = ({ isActive }: QuestionCardProps) => {
  const [rowsOptions, setRowsOptions] = useState<string[]>([
    he.schema.creation.defaultValueOptionsState,
  ]);
  const [colsOptions, setColsOptions] = useState<string[]>([
    he.schema.creation.defaultValueOptionsState,
  ]);

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

export default CheckboxTableQuestion;
