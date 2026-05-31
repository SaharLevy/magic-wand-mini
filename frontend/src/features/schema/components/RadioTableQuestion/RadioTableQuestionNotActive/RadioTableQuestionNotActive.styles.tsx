import { styled } from "@mui/material/styles";

export const RowsColsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
});

export const TableContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  justifyContent: "center",
  fontSize: "1.5rem",
});

export const Row = styled("div")({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

export const TableCell = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "3.4rem",
});
