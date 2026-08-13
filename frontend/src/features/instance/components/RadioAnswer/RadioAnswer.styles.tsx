import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { baseInputStyles } from "../../../../shared/styles";

export const OptionRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const OtherInput = styled(InputBase)({
  ...baseInputStyles,
  borderBottom: "1px solid #e0e0e0",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: "0px 0px 4px 0px",
  },
});
