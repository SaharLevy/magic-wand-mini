import { Radio } from "@mui/material";
import {
  TableScroll,
  Table,
  HeaderRow,
  HeaderCell,
  CornerCell,
  Row,
  RowLabel,
  Cell,
} from "./RadioTableAnswer.styles";

interface RadioTableAnswerProps {
  rows: string[];
  columns: string[];
  tableAnswers: { row: number; column: number }[];
  readOnly?: boolean;
  onChange: (patch: {
    tableAnswers?: { row: number; column: number }[];
  }) => void;
}

const RadioTableAnswer = ({
  rows,
  columns,
  tableAnswers,
  readOnly,
  onChange,
}: RadioTableAnswerProps) => {
  const isSelected = (rowIndex: number, colIndex: number) =>
    tableAnswers.some(
      (answer) => answer.row === rowIndex && answer.column === colIndex,
    );

  const selectCell = (rowIndex: number, colIndex: number) => {
    const withoutRow = tableAnswers.filter((answer) => answer.row !== rowIndex);
    onChange({
      tableAnswers: [...withoutRow, { row: rowIndex, column: colIndex }],
    });
  };

  return (
    <TableScroll>
      <Table>
        <HeaderRow>
          <CornerCell />
          {columns.map((col, colIndex) => (
            <HeaderCell key={colIndex}>{col}</HeaderCell>
          ))}
        </HeaderRow>

        {rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            <RowLabel>{row}</RowLabel>
            {columns.map((_, colIndex) => (
              <Cell key={colIndex}>
                <Radio
                  checked={isSelected(rowIndex, colIndex)}
                  disabled={readOnly}
                  onChange={() => selectCell(rowIndex, colIndex)}
                />
              </Cell>
            ))}
          </Row>
        ))}
      </Table>
    </TableScroll>
  );
};

export default RadioTableAnswer;
