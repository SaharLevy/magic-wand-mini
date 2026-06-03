import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";

interface DeleteButtonProps {
  onClick: () => void;
  isPending: boolean;
}
export const DeleteButton = ({ onClick, isPending }: DeleteButtonProps) => (
  <AppButton variant="outlined" onClick={onClick} disabled={isPending}>
    {he.homePage.deleteButton}
  </AppButton>
);
