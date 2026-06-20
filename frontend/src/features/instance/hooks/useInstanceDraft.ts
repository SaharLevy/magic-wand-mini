import { useEffect, useState } from "react";
import {
  InstanceStatus,
  type IAnswer,
  type IInstance,
  type IInstancePopulated,
  type ISectionAnswer,
} from "../instanceTypes";
import { useNavigate } from "react-router-dom";

const mapSection = (
  instance: IInstance,
  sectionId: string,
  fn: (section: ISectionAnswer) => ISectionAnswer,
): IInstance => ({
  ...instance,
  sections: instance.sections.map((section) =>
    section.sectionId === sectionId ? fn(section) : section,
  ),
});

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
    setInstanceDraft({
      ...instanceFields,
      schemaId: schemaId._id,
    } as IInstance);
  }, [instance]);

  const updateAnswer = (
    sectionId: string,
    questionId: string,
    patch: Partial<IAnswer>,
  ) =>
    setInstanceDraft(
      (prev) =>
        prev &&
        mapSection(prev, sectionId, (section) => ({
          ...section,
          answers: section.answers.map((answer) =>
            answer.questionId === questionId
              ? ({ ...answer, ...patch } as IAnswer)
              : answer,
          ),
        })),
    );

  return { instanceDraft, updateAnswer };
};
