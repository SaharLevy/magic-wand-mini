import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BorderLine, DateDisplay } from "../DateQuestion/DateQuestion.styles";
import Typography from "@mui/material/Typography";
import { he } from "../../../../shared/constants/i18";

interface TimeQuestionProps {
  isActive: boolean;
}

const TimeQuestion = ({ isActive }: TimeQuestionProps) => {
  return !isActive ? (
    <DateDisplay mode={"view"}>
      <Typography variant="body2">{he.schema.creation.time}</Typography>
      <AccessTimeIcon />
    </DateDisplay>
  ) : (
    <>
      <DateDisplay mode={"edit"}>
        <Typography variant="body2">{he.schema.creation.time}</Typography>
        <AccessTimeIcon />
      </DateDisplay>
      <BorderLine />
    </>
  );
};
{
  {
    he.schema.creation.time;
  }
}
export default TimeQuestion;
