import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { baseInputStyles } from "../../../../shared/styles";
import InputBase from "@mui/material/InputBase";

export const ScaleSelect = styled(Select)({
  display: "flex",
  flexDirection: "row",
  fontFamily: "inherit",
  border: 0,
  width: "3rem",
  "&::before": {
    borderBottom: "none !important",
  },
  "&::after": {
    borderBottom: "none !important",
  },
  "& .MuiSelect-select": {
    paddingRight: "0 !important",
  },
  "& .MuiSelect-icon": {
    left: "0",
    right: "auto",
  },
});

export const ScaleMenuItem = styled(MenuItem)({
  gap: "1rem",
  fontFamily: "inherit",
});

export const ScaleInput = styled(InputBase)({
  ...baseInputStyles,
  maxWidth: "30%",
  borderBottom: "1px solid #e0e0e0",
  "&.MuiInputBase-multiline": {
    padding: 0,
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
});

export const ViewContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const ScaleNumberContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  gap: "1rem",
  alignItems: "center",
});

export const NumberContainer = styled("div")({
  width: "0.5rem",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});
