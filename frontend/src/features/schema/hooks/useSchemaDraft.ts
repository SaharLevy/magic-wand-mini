import { useEffect, useState } from "react";
import type {
  IQuestion,
  IQuestionUpdate,
  ISchema,
  ISection,
} from "../schemaTypes";
import { SchemaStatus } from "../schemaTypes";
import { useNavigate } from "react-router-dom";

const mapSection = (
  schema: ISchema,
  sectionId: string,
  fn: (section: ISection) => ISection,
): ISchema => ({
  ...schema,
  sections: schema.sections.map((section) =>
    section._id === sectionId ? fn(section) : section,
  ),
});

export const useSchemaDraft = (schema: ISchema | undefined) => {
  const [schemaDraft, setSchemaDraft] = useState<ISchema | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!schema || schemaDraft) return;
    if (schema.status === SchemaStatus.Published) {
      navigate("/", { replace: true });
      return;
    }
    setSchemaDraft(schema);
  }, [schema]);

  const updateSchema = (patch: Partial<ISchema>) =>
    setSchemaDraft((prev) => prev && { ...prev, ...patch });

  const updateSection = (sectionId: string, patch: Partial<ISection>) =>
    setSchemaDraft(
      (prev) =>
        prev &&
        mapSection(prev, sectionId, (section) => ({ ...section, ...patch })),
    );

  const updateQuestion = (
    sectionId: string,
    questionId: string,
    patch: IQuestionUpdate,
  ) =>
    setSchemaDraft(
      (prev) =>
        prev &&
        mapSection(prev, sectionId, (section) => ({
          ...section,
          questions: section.questions.map((question) =>
            question._id === questionId
              ? ({ ...question, ...patch } as IQuestion)
              : question,
          ),
        })),
    );

  const addSection = (section: ISection) =>
    setSchemaDraft(
      (prev) => prev && { ...prev, sections: [...prev.sections, section] },
    );

  const addQuestion = (sectionId: string, question: IQuestion) =>
    setSchemaDraft(
      (prev) =>
        prev &&
        mapSection(prev, sectionId, (section) => ({
          ...section,
          questions: [...section.questions, question],
        })),
    );

  const removeQuestion = (sectionId: string, questionId: string) =>
    setSchemaDraft(
      (prev) =>
        prev &&
        mapSection(prev, sectionId, (section) => ({
          ...section,
          questions: section.questions.filter(
            (question) => question._id !== questionId,
          ),
        })),
    );

  const publishDraft = () =>
    setSchemaDraft(
      (prev) => prev && { ...prev, status: SchemaStatus.Published },
    );

  return {
    schemaDraft,
    updateSchema,
    updateSection,
    updateQuestion,
    addSection,
    addQuestion,
    removeQuestion,
    publishDraft,
  };
};
