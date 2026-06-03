import { useNavigate } from "react-router-dom";
import { ActionButton } from "../Buttons/ActionButton";
import { ButtonStatus } from "../../HomePage";

interface InstanceDraftActionsProps {
  formId: string;
  isPending: boolean;
  onDelete: (formId: string) => void;
}

export const InstanceDraftActions = ({
  formId,
  isPending,
  onDelete,
}: InstanceDraftActionsProps) => {
  const navigate = useNavigate();

  return (
    <>
      {
        //TO DO: need to change path in the future.
      }
      <ActionButton
        onClick={() => navigate("/")}
        buttonType={ButtonStatus.EDIT}
      />
      <ActionButton
        onClick={() => onDelete(formId)}
        isPending={isPending}
        buttonType={ButtonStatus.DELETE}
      />
    </>
  );
};
