import { ToolbarContainer } from "./Toolbar.styles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';


const Toolbar = () => {
  return (
    <ToolbarContainer>
      <AddCircleOutlineOutlinedIcon />
      <MenuIcon/>
      <DragHandleOutlinedIcon/>
    </ToolbarContainer>
  );
};

export default Toolbar;
