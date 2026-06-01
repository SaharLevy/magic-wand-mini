import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";

interface DeleteButtonProps {
  onClick: () => void;
}
export const DeleteButton = ({ onClick }: DeleteButtonProps) => (
  <AppButton variant="outlined" onClick={onClick}>
    {he.homePage.deleteButton}
  </AppButton>
);
