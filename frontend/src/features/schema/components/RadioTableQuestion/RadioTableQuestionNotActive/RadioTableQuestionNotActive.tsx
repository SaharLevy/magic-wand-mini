import Typography from "@mui/material/Typography";
import {
  HeaderRow,
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
        <TableCell/>
        {colsOptions.map((col) => (
          <TableCell key={col}>
            <Typography variant="body2" noWrap>
              {col}
            </Typography>
          </TableCell>
        ))}
      </Row>

      {rowsOptions.map((row) => (
        <Row key={row}>
          <TableCell>
            <Typography variant="body2" noWrap>
              {row}
            </Typography>
          </TableCell>
          {colsOptions.map((col) => (
            <TableCell key={col}>
              <RadioIcon />
            </TableCell>
          ))}
        </Row>
      ))}
    </TableContainer>
  );
};

export default RadioTableQuestionNotActive;
