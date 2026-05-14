import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AppsIcon from "@mui/icons-material/Apps";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import {
  HeaderRow,
  QuestionTitleInput,
  TypeSelect,
  TypeMenuItem,
  MenuItemContent,
  MenuIcon,
} from "./QuestionHeader.styles";

export type QuestionType =
  | "short"
  | "paragraph"
  | "multipleChoice"
  | "checkboxes"
  | "dropdown"
  | "linearScale"
  | "radioTable"
  | "checkboxTable"
  | "date"
  | "time";

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

      <TypeSelect
        value={questionType}
        onChange={(e) => onTypeChange(e.target.value as QuestionType)}
      >
        <TypeMenuItem value="short">
          <MenuItemContent>
            {"תשובה קצרה"}
            <ShortTextIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="paragraph">
          <MenuItemContent>
            פסקה
            <SubjectIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="multipleChoice">
          <MenuItemContent>
            בחירה מרובה
            <RadioButtonCheckedIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="checkboxes">
          <MenuItemContent>
            תיבות סימון
            <CheckBoxIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="dropdown">
          <MenuItemContent>
            רשימה נפתחת
            <ArrowDropDownCircleIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="linearScale">
          <MenuItemContent>
            {"סולם לינארי"}
            <MoreHorizIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="radioTable">
          <MenuItemContent>
            {"רשת של בחירה מרובה"}
            <MenuIcon src="../../public/menu.png" alt="menu" />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="checkboxTable">
          <MenuItemContent>
            {"רשת תיבות סימון"}
            <AppsIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="date">
          <MenuItemContent>
            {"תאריך"}
            <EventIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value="time">
          <MenuItemContent>
            {"זמן"}
            <AccessTimeIcon />
          </MenuItemContent>
        </TypeMenuItem>
      </TypeSelect>
    </HeaderRow>
  );
};

export default QuestionHeader;
