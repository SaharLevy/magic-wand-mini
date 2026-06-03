import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";
import { ButtonStatus } from "../../HomePage";

interface ActionButtonProps {
  onClick: () => void;
  isPending?: boolean;
  buttonType: ButtonStatus;
}
export const ActionButton = ({
  onClick,
  isPending,
  buttonType,
}: ActionButtonProps) => (
  <AppButton variant="outlined" onClick={onClick} disabled={isPending}>
    {buttonType === ButtonStatus.Delete
      ? he.homePage.deleteButton
      : buttonType === ButtonStatus.Edit
        ? he.homePage.editButton
        : buttonType === ButtonStatus.Fill
          ? he.homePage.fillButton
          : he.homePage.viewButton}
  </AppButton>
);
