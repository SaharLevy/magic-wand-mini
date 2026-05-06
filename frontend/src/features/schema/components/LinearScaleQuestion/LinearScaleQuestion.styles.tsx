import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

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
