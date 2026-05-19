import { styled } from "@mui/system";

interface CardContainerProps {
  isActive?: boolean;
  isHeader?: boolean;
}

interface SectionHeader {
  sectionIndex?: number;
}

export const PageContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  // height: "100vh",
  width: "60%",
  padding: "1rem",
});

export const SectionContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  backgroundColor: "transparent",
});

export const SectionHeader = styled("div")({
  width: "20%",
  height: "2rem",
  backgroundColor: "#fbff00ff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: "0.5rem",
  borderTopRightRadius: "0.5rem",
});
