import { he } from "../../../../shared/constants/i18";
import { TextInput } from "./TextAnswer.styles";

interface TextAnswerProps {
  value: string;
  isParagraph: boolean;
  readOnly?: boolean;
  onChange: (value: string) => void;
}

const TextAnswer = ({
  isParagraph,
  value,
  readOnly,
  onChange,
}: TextAnswerProps) => {
  return (
    <TextInput
      isParagraph={isParagraph}
      placeholder={he.instance.creation.defaultTextAnswer}
      multiline={isParagraph}
      value={value}
      disabled={readOnly}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextAnswer;
