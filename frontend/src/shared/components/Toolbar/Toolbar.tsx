import { ToolbarContainer } from "./Toolbar.styles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import IconButton from "@mui/material/IconButton";

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <IconButton>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <IconButton>
        <SplitscreenOutlinedIcon />
      </IconButton>
    </ToolbarContainer>
  );
};

export default Toolbar;
