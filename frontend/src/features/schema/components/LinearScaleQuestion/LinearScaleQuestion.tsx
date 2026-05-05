import { useState } from "react";
import { TypeMenuItem, TypeSelect } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const LinearScaleQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [minScale, setMinScale] = useState<number>(1);
  const [maxScale, setMaxScale] = useState<number>(5);

  return (
    <>
      <TypeSelect
        value={questionType}
        onChange={(e) => onTypeChange(e.target.value as QuestionType)}
      >
        <TypeMenuItem value="short">{1}</TypeMenuItem>
        <TypeMenuItem value="paragraph">{2}</TypeMenuItem>
        <TypeMenuItem value="short">{3}</TypeMenuItem>
        <TypeMenuItem value="paragraph">{4}</TypeMenuItem>
        <TypeMenuItem value="short">{5}</TypeMenuItem>
        <TypeMenuItem value="paragraph">{6}</TypeMenuItem>
      </TypeSelect>
    </>
  );
};

export default LinearScaleQuestion;
