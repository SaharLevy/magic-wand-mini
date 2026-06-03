import { styled } from "@mui/material/styles";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export const OptionsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const OptionContainer = styled("div")({
  width: "100%",
  display: "flex",
  gap: "0.3rem",
  alignItems: "center",
});

export const CheckboxIcon = styled(CheckBoxOutlineBlankIcon)({
  color: "#BDBDBD",
});
