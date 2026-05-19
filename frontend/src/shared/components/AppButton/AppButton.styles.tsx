import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const AppButton = styled(Button)({
  color: "black",
  borderColor: "#4285f4",
  "&:hover": {
    borderColor: "#4285f4",
    backgroundColor: "rgba(66, 133, 244, 0.08)",
  },
});
