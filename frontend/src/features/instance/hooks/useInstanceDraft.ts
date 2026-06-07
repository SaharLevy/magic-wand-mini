import { useEffect, useState } from "react";
import {
  InstanceStatus,
  type IInstance,
  type IInstancePopulated,
} from "../instanceTypes";
import { useNavigate } from "react-router-dom";

export const useInstanceDraft = (instance: IInstancePopulated | undefined) => {
  const [instanceDraft, setInstanceDraft] = useState<IInstance | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!instance || instanceDraft) return;
    if (instance.status === InstanceStatus.Published) {
      navigate("/", { replace: true });
      return;
    }
    const { schemaId, ...instanceFields } = instance;
    setInstanceDraft(instanceFields as IInstance);
  }, [instance]);

  return { instanceDraft };
};
