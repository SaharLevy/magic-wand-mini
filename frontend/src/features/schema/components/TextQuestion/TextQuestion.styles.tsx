import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const DottedPlaceholder = styled("div")<{ isParagraph?: boolean }>(
  ({ isParagraph }) => ({
    borderBottom: "1px dotted #bdbdbd",
    color: "#757575",
    padding: "8px 0",
    width: isParagraph ? "80%" : "50%",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    marginTop: "0.5rem",
  }),
);

export const DottedLine = styled("div")({
  borderBottom: "1px dotted #bdbdbd",
  padding: "8px 0",
  width: "100%",
  marginTop: "1rem",
});

export const ViewTitle = styled(Typography)({
  fontSize: "1rem",
  fontFamily: "inherit",
  marginBottom: "1.5rem",
});
