import Typography from "@mui/material/Typography";
import {
  Row,
  TableCell,
  TableContainer,
} from "./CheckboxTableQuestionNotActive.styles";
import { CheckboxIcon } from "../../CheckBoxQuestion/CheckBoxQuestion.styles";

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
              <CheckboxIcon />
            </TableCell>
          ))}
        </Row>
      ))}
    </TableContainer>
  );
};

export default RadioTableQuestionNotActive;
