import { FooterContainer, FooterLine } from "./QuestionFooter.styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

interface QuestionFooterProps {
  onQuestionChange: (val: boolean) => void;
  isRequired: boolean;
  //   questionDeleteHandler: () => void;
}

const QuestionFooter = ({
  isRequired,
  onQuestionChange,
  //   questionDeleteHandler,
}: QuestionFooterProps) => {
  return (
    <>
      <FooterLine />
      <FooterContainer>
        <IconButton /*onClick={questionDeleteHandler}*/>
          <DeleteIcon />
        </IconButton>

        <FormControlLabel
          sx={{ ml: 0, mr: 0 }}
          control={
            <Switch
              checked={isRequired ?? false}
              onChange={(element) => onQuestionChange(element.target.checked)}
            />
          }
          label="נדרש"
          labelPlacement="end"
        />
      </FooterContainer>
    </>
  );
};

export default QuestionFooter;
