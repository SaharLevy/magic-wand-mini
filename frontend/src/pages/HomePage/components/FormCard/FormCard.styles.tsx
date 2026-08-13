import { styled } from "@mui/material/styles";
import { Card, CardContent, CardActions, Typography } from "@mui/material";

export const StyledCard = styled(Card)({
  width: "10rem",
  borderRadius: "0.5rem",
});

export const CardBody = styled(CardContent)({
  paddingBottom: "0.5rem",
});

export const CardTitle = styled(Typography)({
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const CardButtons = styled(CardActions)({
  justifyContent: "center",
  gap: "0.5rem",
  paddingTop: 0,
});
