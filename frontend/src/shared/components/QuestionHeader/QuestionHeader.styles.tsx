import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const HeaderRow = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: "1rem",
  width: "100%",
  marginBottom: "1.5rem",
});

export const QuestionTitleInput = styled(InputBase)({
  flexGrow: 1,
  backgroundColor: "#f1f3f4",
  padding: "1rem",
  borderBottom: "1px solid transparent",
  fontFamily: "inherit",
  transition: "all 0.2s ease",
  "& .MuiInputBase-input": {
    padding: 0,
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  "&.Mui-focused": {
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #4285f4",
  },
});

export const TypeSelect = styled(Select)({
  minWidth: "14rem",
  fontFamily: "inherit",
});

export const TypeMenuItem = styled(MenuItem)({
  gap: "0.5rem",
  fontFamily: "inherit",
});

export const ViewTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontFamily: "inherit",
  marginBottom: "1.5rem",
});
