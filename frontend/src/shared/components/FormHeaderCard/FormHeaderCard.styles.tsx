import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { baseInputStyles } from "../../styles";

export const TitleInput = styled(InputBase)({
  ...baseInputStyles,
  borderBottom: "1px solid #e0e0e0",
  "& .MuiInputBase-input": {
    padding: "0px 0px 8px 0px",
    fontSize: "2rem",
    lineHeight: "1.2",
    height: "auto",
  },
});

export const DescriptionInput = styled(InputBase)({
  ...baseInputStyles,
  borderBottom: "1px solid #e0e0e0",
  "&.MuiInputBase-multiline": {
    padding: 0,
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
});

export const ViewTitle = styled(Typography)({
  fontSize: "2rem",
  letterSpacing: "normal",
  fontFamily: "inherit",
  lineHeight: "1.2",
  padding: "0px 0px 8px 0px",
  borderBottom: "1px solid transparent",
});

export const ViewDescription = styled(Typography)({
  fontSize: "1rem",
  letterSpacing: "normal",
  fontFamily: "inherit",
  lineHeight: "1.5",
  borderBottom: "1px solid transparent",
  whiteSpace: "pre-wrap",
});
