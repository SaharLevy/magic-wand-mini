import { useNavigate } from "react-router-dom";
import { EditButton } from "../Buttons/EditButton";
import { DeleteButton } from "../Buttons/DeleteButton";

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
      <EditButton onClick={() => navigate(`/schemas/${formId}`)} />
      <DeleteButton onClick={() => onDelete(formId)} isPending={isPending} />
    </>
  );
};
