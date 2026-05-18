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
  height: "100vh",
  width: "60%",
  padding: "1rem",
});

export const CardContainer = styled("div")<CardContainerProps>(
  ({ isActive }) => ({
    width: "100%",
    minHeight: "8rem",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderRadius: "0.5rem",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
    padding: "2rem",
    direction: "rtl",
    marginBottom: "1rem",
    borderRight: isActive ? "0.5rem solid #4285f4" : "0.5rem solid transparent",
    transition: "border 0.2s ease-in-out",
  }),
);

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
  backgroundColor: "green",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: "0.5rem",
  borderTopRightRadius: "0.5rem",
});
