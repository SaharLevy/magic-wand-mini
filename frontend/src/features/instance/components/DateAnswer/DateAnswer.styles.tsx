import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { baseInputStyles } from "../../../../shared/styles";

export const DateAndTimeInput = styled(InputBase)({
  ...baseInputStyles,
  borderBottom: "1px solid #e0e0e0",
  maxWidth: "30%",
  "& .MuiInputBase-input": {
    padding: "0px 0px 8px 0px",
    fontSize: "1rem",
    lineHeight: "1.5",
    "&::-webkit-calendar-picker-indicator": {
      filter: "brightness(0)",
      cursor: "pointer",
    },
  },
});
