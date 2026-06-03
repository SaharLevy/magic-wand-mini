import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AppsIcon from "@mui/icons-material/Apps";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Menu from "../../../../public/menu.png";

import {
  HeaderRow,
  QuestionTitleInput,
  TypeSelect,
  TypeMenuItem,
  MenuItemContent,
} from "./QuestionHeader.styles";
import { QuestionTypes } from "../../../features/schema/schemaTypes";
import { he } from "../../constants/i18";

interface QuestionHeaderProps {
  questionText: string;
  onQuestionChange: (val: string) => void;
  questionType: QuestionTypes;
  onTypeChange: (type: QuestionTypes) => void;
}

const questionTypeOptions = [
  {
    type: QuestionTypes.SHORT_TEXT,
    label: he.schema.creation.headerQuestionShortText,
    icon: <ShortTextIcon />,
  },
  {
    type: QuestionTypes.PARAGRAPH,
    label: he.schema.creation.headerQuestionParagraph,
    icon: <SubjectIcon />,
  },
  {
    type: QuestionTypes.RADIO,
    label: he.schema.creation.headerQuestionRadio,
    icon: <RadioButtonCheckedIcon />,
  },
  {
    type: QuestionTypes.CHECKBOX,
    label: he.schema.creation.headerQuestionCheckbox,
    icon: <CheckBoxIcon />,
  },
  {
    type: QuestionTypes.DROPDOWN,
    label: he.schema.creation.headerQuestionDropdown,
    icon: <ArrowDropDownCircleIcon />,
  },
  {
    type: QuestionTypes.LINEAR_SCALE,
    label: he.schema.creation.headerQuestionLinearScale,
    icon: <MoreHorizIcon />,
  },
  {
    type: QuestionTypes.RADIO_TABLE,
    label: he.schema.creation.headerQuestionRadioTable,
    icon: <img src={Menu} alt="menu" />,
  },
  {
    type: QuestionTypes.CHECKBOX_TABLE,
    label: he.schema.creation.headerQuestionCheckboxTable,
    icon: <AppsIcon />,
  },
  {
    type: QuestionTypes.DATE,
    label: he.schema.creation.headerQuestionDate,
    icon: <EventIcon />,
  },
  {
    type: QuestionTypes.TIME,
    label: he.schema.creation.time,
    icon: <AccessTimeIcon />,
  },
];

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
        {questionTypeOptions.map(({ type, label, icon }) => (
          <TypeMenuItem key={type} value={type}>
            <MenuItemContent>
              {label}
              {icon}
            </MenuItemContent>
          </TypeMenuItem>
        ))}
      </TypeSelect>
    </HeaderRow>
  );
};

export default QuestionHeader;
