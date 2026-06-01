import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";

interface ViewButtonProps {
  onClick: () => void;
}
export const ViewButton = ({ onClick }: ViewButtonProps) => (
  <AppButton variant="outlined" onClick={onClick}>
    {he.homePage.viewButton}
  </AppButton>
);
