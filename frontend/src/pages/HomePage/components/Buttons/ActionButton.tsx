import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
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
    {buttonType}
  </AppButton>
);
