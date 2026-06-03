import { useNavigate } from "react-router-dom";
import { EditButton } from "../Buttons/EditButton";
import { DeleteButton } from "../Buttons/DeleteButton";

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
        // need to change path in the future.
      }
      <EditButton onClick={() => navigate("/")} />
      <DeleteButton onClick={() => onDelete(formId)} isPending={isPending} />
    </>
  );
};
