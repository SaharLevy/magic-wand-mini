import { styled } from "@mui/material/styles";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export const OptionsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const OptionContainer = styled("div")({
  width: "100%",
  display: "flex",
  gap: "0.3rem",
});

export const RadioIcon = styled(RadioButtonUncheckedIcon)({
  color: "#BDBDBD",
});

export const AddOption = styled("button")({
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#BDBDBD",
  padding: 0,
  fontSize: "inherit",
  "&:hover": {
    color: "#757575",
  },
});
