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
  gap: "0.5rem",
});

export const View = styled("div")({
  overflow: "hidden",
  flex: 1,
  maxWidth: "60vw",
});

export const Track = styled("div")({
  display: "flex",
  gap: "1rem",
});

export const Slide = styled("div")({
  flex: "0 0 auto",
});
