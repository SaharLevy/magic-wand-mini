import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import IconButton from "@mui/material/IconButton";

import {
  HeaderRow,
  QuestionTitleInput,
  TypeSelect,
  TypeMenuItem,
} from "./QuestionHeader.styles";

export type QuestionType =
  | "short"
  | "paragraph"
  | "multipleChoice"
  | "checkboxes"
  | "dropdown";

interface QuestionHeaderProps {
  questionText: string;
  onQuestionChange: (val: string) => void;
  questionType: QuestionType;
  onTypeChange: (type: QuestionType) => void;
}

const QuestionHeader = ({
  questionText,
  onQuestionChange,
  questionType,
  onTypeChange,
}: QuestionHeaderProps) => {
  return (
    <HeaderRow>
      <QuestionTitleInput
        fullWidth
        multiline
        value={questionText}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="שאלה"
      />

      <IconButton>
        <CropOriginalIcon />
      </IconButton>
      <TypeSelect
        value={questionType}
        onChange={(e) => onTypeChange(e.target.value as QuestionType)}
      >
        <TypeMenuItem value="short">
          <ShortTextIcon />
          תשובה קצרה
        </TypeMenuItem>

        <TypeMenuItem value="paragraph">
          <SubjectIcon />
          פסקה
        </TypeMenuItem>

        <TypeMenuItem value="multipleChoice">
          <RadioButtonCheckedIcon />
          בחירה מרובה
        </TypeMenuItem>

        <TypeMenuItem value="checkboxes">
          <CheckBoxIcon />
          תיבות סימון
        </TypeMenuItem>

        <TypeMenuItem value="dropdown">
          <ArrowDropDownCircleIcon />
          רשימה נפתחת
        </TypeMenuItem>
      </TypeSelect>
    </HeaderRow>
  );
};

export default QuestionHeader;
