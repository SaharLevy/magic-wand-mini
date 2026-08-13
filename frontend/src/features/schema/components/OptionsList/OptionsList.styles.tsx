import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const DeleteButton = styled(IconButton)`
  padding: 4px;
`;

export const NumberContainer = styled("div")({
  minWidth: "1.2rem",
  maxWidth: "1.2rem",
  display: "flex",
  alignContent: "center",
  alignItems: "center",
});
