import { useState } from "react";
import {
  OptionContainer,
  OptionsContainer,
} from "../RadioQuestion/RadioQuestion.styles";
import { RowsColsContainer } from "./RadioTableQuestion.styles";
import { NumberContainer } from "../DropdownQuestion/DropdownQuestion.style";
import RadioTableQuestionActive from "./RadioTableQuestionActive/RadioTableQuestionActive";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const RadioTableQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [rowsOptions, setRowsOptions] = useState<string[]>(["אפשרות 1"]);
  const [colsOptions, setColsOptions] = useState<string[]>(["אפשרות 1"]);

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
    <RowsColsContainer>
      <OptionsContainer>
        {rowsOptions.map((option, index) => (
          <OptionContainer key={option}>
            <NumberContainer>{`${index + 1}.`}</NumberContainer>
            {option}
          </OptionContainer>
        ))}
      </OptionsContainer>
    </RowsColsContainer>
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
