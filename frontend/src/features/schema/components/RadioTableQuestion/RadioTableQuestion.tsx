import { useState } from "react";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const RadioTableQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);

  const addRowHandler = () => {
    setRows((prev) => prev + 1);
  };

  const addColHandler = () => {
    setCols((prev) => prev + 1);
  };

  const removeRowHandler = () => {
    setRows((prev) => Math.max(1, prev - 1));
  };
  const removeColHandler = () => {
    setCols((prev) => Math.max(1, prev - 1));
  };

  return !isActive ? <></> : <></>;
};

export default RadioTableQuestion;
