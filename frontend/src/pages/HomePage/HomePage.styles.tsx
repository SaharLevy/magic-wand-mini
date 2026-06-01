import styled from "@emotion/styled";

export const PageContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "60%",
  padding: "1rem",
  minWidth: 0,
  overflow: "hidden",

  "& > *": {
    minWidth: 0,
  },
});
