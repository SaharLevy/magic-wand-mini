import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { baseInputStyles } from "../../../../shared/styles";

export const TextInput = styled(InputBase)<{ isParagraph?: boolean }>(
  ({ isParagraph }) => ({
    ...baseInputStyles,
    borderBottom: "1px solid #e0e0e0",
    width: isParagraph ? "80%" : "40%",
    "& .MuiInputBase-input": {
      padding: "0px 0px 8px 0px",
      fontSize: "2rem",
      lineHeight: "1.2",
      height: "auto",
    },
  }),
);
