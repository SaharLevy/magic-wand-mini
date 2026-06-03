import { useNavigate } from "react-router-dom";
import { ActionButton } from "../Buttons/ActionButton";
import { ButtonStatus } from "../../HomePage";

interface SchemaDraftActionsProps {
  formId: string;
  isPending: boolean;
  onDelete: (formId: string) => void;
}

export const SchemaDraftActions = ({
  formId,
  onDelete,
  isPending,
}: SchemaDraftActionsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ActionButton
        onClick={() => navigate(`/schemas/${formId}`)}
        buttonType={ButtonStatus.Edit}
      />
      <ActionButton
        onClick={() => onDelete(formId)}
        isPending={isPending}
        buttonType={ButtonStatus.Delete}
      />
    </>
  );
};
