import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export const RowsColsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
//   gap: "1rem",
});

export const DeleteButton = styled(CloseIcon)`
  padding: 4px;
`;
