import {
  ColName,
  HeaderRows,
  TableContainer,
} from "./RadioTableQuestionNotActive.styles";

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
      <HeaderRows>
        {colsOptions.map((col) => (
          <ColName key={col}>{col}</ColName>
        ))}
      </HeaderRows>
    </TableContainer>
  );
};

export default RadioTableQuestionNotActive;
