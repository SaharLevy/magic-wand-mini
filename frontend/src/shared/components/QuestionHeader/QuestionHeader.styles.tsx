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
  minWidth: "15rem",
  fontFamily: "inherit",
  "& .MuiSelect-select": {
    paddingRight: "1rem !important",
  },
  "& .MuiSelect-icon": {
    left: "7px",
    right: "auto",
  },
  div: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
});

export const TypeMenuItem = styled(MenuItem)({
  display: "flex",
  gap: "1rem",
  fontFamily: "inherit",
  flexDirection: "row-reverse",
});

export const MenuItemContent = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  justifyContent: "flex-start",
});

export const ViewTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontFamily: "inherit",
  marginBottom: "1.5rem",
});

export const MenuIcon = styled("img")({
  cursor: "pointer",
});
