import { styled } from "@mui/material/styles";

export const TableScroll = styled("div")({
  width: "100%",
  overflowX: "auto",
});

export const Table = styled("div")({
  display: "inline-block",
  minWidth: "100%",
});

export const HeaderRow = styled("div")({
  display: "flex",
});

export const Row = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const CornerCell = styled("div")({
  flex: "0 0 8rem",
});

export const RowLabel = styled("div")({
  flex: "0 0 8rem",
  textAlign: "start",
  fontSize: "0.9rem",
});

export const HeaderCell = styled("div")({
  flex: "0 0 6rem",
  textAlign: "center",
  fontSize: "0.85rem",
  padding: "0 0.25rem",
});

export const Cell = styled("div")({
  flex: "0 0 6rem",
  display: "flex",
  justifyContent: "center",
});
