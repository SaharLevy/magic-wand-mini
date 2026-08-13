import { Checkbox } from "@mui/material";
import {
  TableScroll,
  Table,
  HeaderRow,
  HeaderCell,
  CornerCell,
  Row,
  RowLabel,
  Cell,
} from "../RadioTableAnswer/RadioTableAnswer.styles";

interface CheckboxTableAnswerProps {
  rows: string[];
  columns: string[];
  tableAnswers: { row: number; columns: number[] }[];
  readOnly?: boolean;
  onChange: (patch: {
    tableAnswers?: { row: number; columns: number[] }[];
  }) => void;
}

const CheckboxTableAnswer = ({
  rows,
  columns,
  tableAnswers,
  readOnly,
  onChange,
}: CheckboxTableAnswerProps) => {
  const isSelected = (rowIndex: number, colIndex: number) => {
    const rowEntry = tableAnswers.find((answer) => answer.row === rowIndex);
    return rowEntry ? rowEntry.columns.includes(colIndex) : false;
  };

  const toggleCell = (rowIndex: number, colIndex: number, checked: boolean) => {
    const rowEntry = tableAnswers.find((answer) => answer.row === rowIndex);
    const currentColumns = rowEntry ? rowEntry.columns : [];

    const newColumns = checked
      ? [...currentColumns, colIndex]
      : currentColumns.filter((col) => col !== colIndex);

    const withoutRow = tableAnswers.filter((answer) => answer.row !== rowIndex);
    const newTableAnswers =
      newColumns.length > 0
        ? [...withoutRow, { row: rowIndex, columns: newColumns }]
        : withoutRow;

    onChange({ tableAnswers: newTableAnswers });
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
                <Checkbox
                  checked={isSelected(rowIndex, colIndex)}
                  disabled={readOnly}
                  onChange={(e) =>
                    toggleCell(rowIndex, colIndex, e.target.checked)
                  }
                />
              </Cell>
            ))}
          </Row>
        ))}
      </Table>
    </TableScroll>
  );
};

export default CheckboxTableAnswer;
