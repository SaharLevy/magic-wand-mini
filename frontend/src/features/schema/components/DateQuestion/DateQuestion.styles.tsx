import { styled } from "@mui/material/styles";

interface DateDisplayProps {
  mode?: "view" | "edit";
}

export const DateDisplay = styled("div")<DateDisplayProps>(
  ({ mode = "edit" }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: mode === "edit" ? "1px solid #bdbdbd" : "none",
    color: "#757575",
    padding: "4px 0",
    width: "30%",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    marginTop: "0.5rem",
  }),
);

export const BorderLine = styled("div")({
  width: "100%",
  borderBottom: "1px solid #bdbdbd",
  marginTop: "1.6rem",
});
