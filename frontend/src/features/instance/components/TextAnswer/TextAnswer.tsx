import { he } from "../../../../shared/constants/i18";
import { TextInput } from "./TextAnswer.styles";

interface TextAnswerProps {
  value: string;
  isParagraph: boolean;
  onChange: (value: string) => void;
}

const TextAnswer = ({ isParagraph, value, onChange }: TextAnswerProps) => {
  return (
    <TextInput
      isParagraph={isParagraph}
      placeholder={he.instance.creation.defaultTextAnswer}
      multiline={isParagraph}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextAnswer;
