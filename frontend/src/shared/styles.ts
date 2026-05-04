export const baseInputStyles = {
  width: "100%",
  fontFamily: "inherit",
  letterSpacing: "normal",
  transition: "border-color 0.2s ease-in-out",
  "&:hover": {
    borderBottom: "1px solid #e0e0e0",
    borderBottomColor: "#bdbdbd",
  },
  "&.Mui-focused": {
    borderBottomColor: "#4285f4",
  },
  "& .MuiInputBase-input": {
    padding: "0px 0px 8px 0px",
  },
};
