import styled from "@emotion/styled";

interface CardContainerProps {
  isActive?: boolean;
  isHeader?: boolean;
  isSection?: boolean;
  error?: boolean;
}

export const CardContainer = styled("div")<CardContainerProps>(
  ({ isActive, isHeader, isSection, error }) => ({
    width: "100%",
    minHeight: "8rem",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderRadius: "0.5rem",
    padding: "2rem",
    direction: "rtl",
    marginBottom: "1rem",
    borderTop: isHeader ? "0.8rem solid #fbff00ff" : "0",
    borderRight: isActive ? "0.5rem solid #4285f4" : "0.5rem solid #ceced3",
    borderTopRightRadius: isSection || isHeader ? 0 : "0.5rem",
    boxShadow: error
      ? "0 0 8px 6px rgba(211, 47, 47, 0.6), 0px 6px 6px rgba(0,0,0,0.1)"
      : "0px 3px 6px rgba(0,0,0,0.1)",
    transition: "border 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  }),
);

export const ContainerX = styled("div")<{ paddingRight?: string }>(
  ({ paddingRight }) => ({
    display: "flex",
    justifyContent: "flex-start",
    gap: "1.5rem",
    alignItems: "center",
    paddingRight: paddingRight,
  }),
);

export const ContainerY = styled("div")<{
  paddingRight?: string;
  paddingTop?: string;
}>(({ paddingRight, paddingTop }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "1rem",
  paddingRight: paddingRight,
  paddingTop: paddingTop,
}));
