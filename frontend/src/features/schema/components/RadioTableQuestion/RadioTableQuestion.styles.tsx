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

export const NumberContainer = styled("div")({
  width: "1.5rem",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});
