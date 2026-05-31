import { he } from "../../../../shared/constants/i18";
import { DottedLine, DottedPlaceholder } from "./TextQuestion.styles";

interface TextQuestionProps {
  isActive: boolean;
  isParagraph: boolean;
  questionType: "short" | "paragraph";
}

const TextQuestion = ({ isParagraph, questionType }: TextQuestionProps) => {
  return (
    <>
      <DottedPlaceholder isParagraph={isParagraph}>
        {questionType === "short"
          ? he.schema.creation.shortText
          : he.schema.creation.longText}
      </DottedPlaceholder>
      <DottedLine />
    </>
  );
};

export default TextQuestion;
