import { useNavigate } from "react-router-dom";
import { ActionButton } from "../Buttons/ActionButton";
import { ButtonStatus } from "../../HomePage";

export enum DRAFT_KIND {
  Instance = "instance",
  Schema = "schema",
}
const DRAFT_ROUTES: Record<DRAFT_KIND, string> = {
  [DRAFT_KIND.Instance]: "/instances",
  [DRAFT_KIND.Schema]: "/schemas",
};

interface DraftActionsProps {
  formId: string;
  isPending: boolean;
  kind: DRAFT_KIND;
  onDelete: (formId: string) => void;
}

export const DraftActions = ({
  formId,
  kind,
  onDelete,
  isPending,
}: DraftActionsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ActionButton
        onClick={() => navigate(`${DRAFT_ROUTES[kind]}/${formId}`)}
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
