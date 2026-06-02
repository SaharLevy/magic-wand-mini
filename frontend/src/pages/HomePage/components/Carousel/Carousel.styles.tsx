import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const CarouselWrapper = styled(Box)({
  width: "100%",
});

export const CarouselHeading = styled(Typography)({
  textAlign: "right",
  marginBottom: "0.5rem",
});

export const CarouselRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  margin: "1rem 0",
  minWidth: 0,
});

export const View = styled("div")({
  overflow: "hidden",
  flex: "1 1 0",
  minWidth: 0,
});

export const Track = styled("div")({
  display: "flex",
  gap: "1rem",
});

export const Slide = styled("div")({
  width: "10rem",
  flex: "0 0 auto",
  alignItems: "center",
});
