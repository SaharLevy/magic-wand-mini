import Typography from "@mui/material/Typography";
import { BorderLine, DateDisplay } from "./DateQuestion.styles";
import EventIcon from "@mui/icons-material/Event";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const DateQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  return !isActive ? (
    <DateDisplay mode={"view"}>
      <Typography variant="body2">{"יום, חודש, שנה"}</Typography>
      <EventIcon />
    </DateDisplay>
  ) : (
    <>
      <DateDisplay mode={"edit"}>
        <Typography variant="body2">{"יום, חודש, שנה"}</Typography>
        <EventIcon />
      </DateDisplay>
      <BorderLine />
    </>
  );
};

export default DateQuestion;
