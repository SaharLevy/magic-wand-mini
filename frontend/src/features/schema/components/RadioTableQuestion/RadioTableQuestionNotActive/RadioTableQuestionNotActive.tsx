import Typography from "@mui/material/Typography";
import {
  Row,
  TableCell,
  TableContainer,
} from "./RadioTableQuestionNotActive.styles";
import { RadioIcon } from "../../RadioQuestion/RadioQuestion.styles";

interface QuestionCardProps {
  rowsOptions: string[];
  colsOptions: string[];
}

const RadioTableQuestionNotActive = ({
  rowsOptions,
  colsOptions,
}: QuestionCardProps) => {
  return (
    <TableContainer>
      <Row>
        <TableCell />
        {colsOptions.map((col, index) => (
          <TableCell key={index}>
            <Typography variant="body2" noWrap>
              {col}
            </Typography>
          </TableCell>
        ))}
      </Row>

      {rowsOptions.map((row, index) => (
        <Row key={index}>
          <TableCell>
            <Typography variant="body2" noWrap>
              {row}
            </Typography>
          </TableCell>
          {colsOptions.map((col, index) => (
            <TableCell key={index}>
              <RadioIcon />
            </TableCell>
          ))}
        </Row>
      ))}
    </TableContainer>
  );
};

export default RadioTableQuestionNotActive;
