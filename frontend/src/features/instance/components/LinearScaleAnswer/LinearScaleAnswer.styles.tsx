import { RadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ScaleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const ScaleGroup = styled(RadioGroup)({
  flex: 1,
  flexWrap: "nowrap",
  justifyContent: "space-around",
  alignContent: "flex-start"
});

export const ScaleColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
});

export const ScaleNumber = styled("span")({
  fontSize: "1rem",
});

export const EndLabel = styled("span")({
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
});