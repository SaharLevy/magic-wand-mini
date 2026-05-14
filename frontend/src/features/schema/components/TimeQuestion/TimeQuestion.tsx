import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BorderLine, DateDisplay } from "../DateQuestion/DateQuestion.styles";
import Typography from "@mui/material/Typography";

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const TimeQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  return !isActive ? (
    <DateDisplay mode={"view"}>
      <Typography variant="body2">{"שעה"}</Typography>
      <AccessTimeIcon />
    </DateDisplay>
  ) : (
    <>
      <DateDisplay mode={"edit"}>
        <Typography variant="body2">{"שעה"}</Typography>
        <AccessTimeIcon />
      </DateDisplay>
      <BorderLine />
    </>
  );
};

export default TimeQuestion;
