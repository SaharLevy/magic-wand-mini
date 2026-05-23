import Typography from "@mui/material/Typography";
import { BorderLine, DateDisplay } from "./DateQuestion.styles";
import EventIcon from "@mui/icons-material/Event";
import { he } from "../../../../shared/constants/i18";

interface QuestionCardProps {
  isActive: boolean;
}

const DateQuestion = ({ isActive }: QuestionCardProps) => {
  return !isActive ? (
    <DateDisplay mode={"view"}>
      <Typography variant="body2">{he.schema.creation.date}</Typography>
      <EventIcon />
    </DateDisplay>
  ) : (
    <>
      <DateDisplay mode={"edit"}>
        <Typography variant="body2">{he.schema.creation.date}</Typography>
        <EventIcon />
      </DateDisplay>
      <BorderLine />
    </>
  );
};

export default DateQuestion;
