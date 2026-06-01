import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";

interface FillButtonProps {
  onClick: () => void;
}
export const FillButton = ({ onClick }: FillButtonProps) => (
  <AppButton variant="outlined" onClick={onClick}>
    {he.homePage.fillButton}
  </AppButton>
);
