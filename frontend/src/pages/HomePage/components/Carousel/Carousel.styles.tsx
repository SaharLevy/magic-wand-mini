import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";

const CARD = 10;
const GAP = 1;
const track = (n: number) => `${n * CARD + (n - 1) * GAP}rem`;

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
  justifyContent: "center",
  gap: "1rem",
  margin: "1rem 0",
  width: "100%",
});

export const View = styled("div")(({ theme }) => ({
  overflow: "hidden",
  flex: "0 0 auto",
  minWidth: 0,
  width: track(4),
  [theme.breakpoints.down("lg")]: { width: track(3) },
  [theme.breakpoints.down("md")]: { width: track(2) },
  [theme.breakpoints.down("sm")]: { width: track(1) },
}));

export const Track = styled("div")({
  display: "flex",
  gap: "1rem",
});

export const Slide = styled("div")({
  width: "10rem",
  flex: "0 0 auto",
  alignItems: "center",
});

export const ArrowButton = styled(IconButton)({
  color: "#000",
  flex: "0 0 auto",
  width: "2.5rem",
  height: "2.5rem",
});
