import { ToolbarContainer } from "./Toolbar.styles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";

interface ToolbarProps {
  anchorEl: HTMLElement | null;
  onAddSection: () => void;
  onAddQuestion?: () => void;
}

const Toolbar = ({ anchorEl, onAddSection, onAddQuestion }: ToolbarProps) => {
  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="left-start"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      <ToolbarContainer>
        <IconButton onClick={onAddQuestion} disabled={!onAddQuestion}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
        <IconButton onClick={onAddSection}>
          <SplitscreenOutlinedIcon />
        </IconButton>
      </ToolbarContainer>
    </Popper>
  );
};

export default Toolbar;
