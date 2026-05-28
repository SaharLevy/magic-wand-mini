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
import { QuestionTypes } from "../../../features/schema/schemaTypes";
import { he } from "../../constants/i18";

interface QuestionHeaderProps {
  questionText: string;
  onQuestionChange: (val: string) => void;
  questionType: QuestionTypes;
  onTypeChange: (type: QuestionTypes) => void;
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
        onChange={(element) => onQuestionChange(element.target.value)}
        placeholder={he.schema.creation.baseQuestionDefaultText}
      />

      <TypeSelect
        value={questionType}
        onChange={(element) =>
          onTypeChange(element.target.value as QuestionTypes)
        }
      >
        <TypeMenuItem value={QuestionTypes.SHORT_TEXT}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionShortText}
            <ShortTextIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.PARAGRAPH}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionParagraph}
            <SubjectIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.RADIO}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionRadio}
            <RadioButtonCheckedIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.CHECKBOX}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionCheckbox}
            <CheckBoxIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.DROPDOWN}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionDropdown}
            <ArrowDropDownCircleIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.LINEAR_SCALE}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionLinearScale}
            <MoreHorizIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.RADIO_TABLE}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionRadioTable}
            <MenuIcon src="../../public/menu.png" alt="menu" />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.CHECKBOX_TABLE}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionCheckboxTable}
            <AppsIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.DATE}>
          <MenuItemContent>
            {he.schema.creation.headerQuestionDate}
            <EventIcon />
          </MenuItemContent>
        </TypeMenuItem>

        <TypeMenuItem value={QuestionTypes.TIME}>
          <MenuItemContent>
            {he.schema.creation.time}
            <AccessTimeIcon />
          </MenuItemContent>
        </TypeMenuItem>
      </TypeSelect>
    </HeaderRow>
  );
};

export default QuestionHeader;
