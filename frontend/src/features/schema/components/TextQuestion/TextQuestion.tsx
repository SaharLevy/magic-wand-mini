import { DottedLine, DottedPlaceholder } from "./TextQuestion.styles";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
  isParagraph: boolean;
  questionType: "short" | "paragraph";
}

const TextQuestion = ({ isParagraph, questionType }: QuestionCardProps) => {
  return (
    <>
      <DottedPlaceholder isParagraph={isParagraph}>
        {questionType === "short"
          ? "טקסט של תשובה קצרה"
          : "טקסט של תשובה ארוכה"}
      </DottedPlaceholder>
      <DottedLine />
    </>
  );
};

export default TextQuestion;
