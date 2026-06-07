import { he } from "../../../../shared/constants/i18";
import { TextInput } from "./TextAnswer.styles";

interface TextQuestionProps {
  textInput: string;
  isParagraph: boolean;
}

const TextQuestion = ({ isParagraph, textInput }: TextQuestionProps) => {
  return (
    <>
      <TextInput
        isParagraph={isParagraph}
        placeholder={he.instance.creation.defaultTextAnswer}
      ></TextInput>
    </>
  );
};

export default TextQuestion;
