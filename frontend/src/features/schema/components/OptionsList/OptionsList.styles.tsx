import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export const DeleteButton = styled(CloseIcon)`
  padding: 4px;
`;

export const NumberContainer = styled("div")({
  minWidth: "1.2rem",
  maxWidth: "1.2rem",
  display: "flex",
  alignContent: "center",
  alignItems: "center",
});
