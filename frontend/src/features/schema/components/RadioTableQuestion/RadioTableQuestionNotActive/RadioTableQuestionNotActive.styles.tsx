import { styled } from "@mui/material/styles";

export const RowsColsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  //   gap: "1rem",
});

export const TableContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  fontSize: "0.9rem"
});

export const HeaderRows = styled("div")({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const ColName = styled("div")({
  display: "flex",
  width: "4.5rem",
});
