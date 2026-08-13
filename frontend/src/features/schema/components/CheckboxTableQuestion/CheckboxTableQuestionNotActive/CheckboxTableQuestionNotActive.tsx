import Typography from "@mui/material/Typography";
import {
  Row,
  TableCell,
  TableContainer,
} from "./CheckboxTableQuestionNotActive.styles";
import { CheckboxIcon } from "../../CheckBoxQuestion/CheckBoxQuestion.styles";

interface CheckboxTableQuestionNotActiveProps {
  rowsOptions: string[];
  colsOptions: string[];
}

const CheckboxTableQuestionNotActive = ({
  rowsOptions,
  colsOptions,
}: CheckboxTableQuestionNotActiveProps) => {
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
          {colsOptions.map((_, index) => (
            <TableCell key={index}>
              <CheckboxIcon />
            </TableCell>
          ))}
        </Row>
      ))}
    </TableContainer>
  );
};

export default CheckboxTableQuestionNotActive;
