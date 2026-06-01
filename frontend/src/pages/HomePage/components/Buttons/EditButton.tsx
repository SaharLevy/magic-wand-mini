import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";

interface EditButtonProps {
  onClick: () => void;
}
export const EditButton = ({ onClick }: EditButtonProps) => (
  <AppButton variant="outlined" onClick={onClick}>
    {he.homePage.editButton}
  </AppButton>
);
