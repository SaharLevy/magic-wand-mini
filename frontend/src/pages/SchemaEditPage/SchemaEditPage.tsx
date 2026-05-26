import { useEffect, useState } from "react";
import {
  useCreateQuestion,
  useGetSchema,
} from "../../features/schema/hooks/useSchema";
import FormHeaderCard from "../../shared/components/FormHeaderCard/FormHeaderCard";
import SectionWrapper from "../../shared/components/SectionWrapper/SectionWrapper";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import Toolbar from "../../shared/components/Toolbar/Toolbar";
import { Link, useParams } from "react-router-dom";
import { useCreateSection } from "../../features/schema/hooks/useSchema";
import { he } from "../../shared/constants/i18";
import type {
  IQuestion,
  IQuestionUpdate,
  ISchema,
  ISection,
} from "../../features/schema/schemaTypes";
import { BottomLeftStack, TopRightSlot } from "./SchemaEditPage.styles";

const SchemaEditPage = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [schemaDraft, setSchemaDraft] = useState<ISchema | null>(null);

  const { schema, isPending, isError } = useGetSchema(schemaId);
  const { createSection } = useCreateSection(schemaId);
  const { createQuestion } = useCreateQuestion(schemaId);

  const updateSchema = (patch: Partial<ISchema>) => {
    setSchemaDraft((prev) => prev && { ...prev, ...patch });
  };

  const updateSection = (sectionId: string, patch: Partial<ISection>) => {
    setSchemaDraft(
      (prev) =>
        prev && {
          ...prev,
          sections: prev.sections.map((section) =>
            section._id === sectionId ? { ...section, ...patch } : section,
          ),
        },
    );
  };

  const updateQuestion = (
    sectionId: string,
    questionId: string,
    patch: IQuestionUpdate,
  ) => {
    setSchemaDraft(
      (prev) =>
        prev && {
          ...prev,
          sections: prev.sections.map((section) =>
            section._id === sectionId
              ? {
                  ...section,
                  questions: section.questions.map((question) =>
                    question._id === questionId
                      ? ({ ...question, ...patch } as IQuestion)
                      : question,
                  ),
                }
              : section,
          ),
        },
    );
  };

  const activeSectionId =
    activeCardId && activeCardId !== "header" ? activeCardId : null;

  const handleAddQuestion = activeSectionId
    ? async () => {
        const newQuestion = await createQuestion(activeSectionId);
        setSchemaDraft(
          (prev) =>
            prev && {
              ...prev,
              sections: prev.sections.map((section) =>
                section._id === activeSectionId
                  ? {
                      ...section,
                      questions: [...section.questions, newQuestion],
                    }
                  : section,
              ),
            },
        );
      }
    : undefined;

  const handleAddSection = async () => {
    const newSection = await createSection();
    setSchemaDraft(
      (prev) =>
        prev && {
          ...prev,
          sections: [...prev.sections, newSection],
        },
    );
  };

  const handleActivate = (cardId: string, element: HTMLElement) => {
    setActiveCardId(cardId);
    setAnchorEl(element);
  };

  useEffect(() => {
    if (!schema) return;
    if (schemaDraft) return;
    setSchemaDraft(schema);
  }, [schema]);

  if (isPending || !schemaDraft) return <div>Loading...</div>;
  if (isError || !schema) return <div>Error...</div>;

  return (
    <>
      <FormHeaderCard
        isActive={activeCardId === "header"}
        onActivate={(element) => handleActivate("header", element)}
        title={schemaDraft.title}
        description={schemaDraft.description ?? ""}
        onTitleChange={(value) => updateSchema({ title: value })}
        onDescriptionChange={(value) => updateSchema({ description: value })}
        sectionsCount={schemaDraft.sections.length + 1}
      />
      {schemaDraft.sections.map((section, index) => {
        return (
          <SectionWrapper
            key={section._id}
            sectionIndex={index + 2}
            sectionsCount={schemaDraft.sections.length + 1}
            isActive={activeCardId === section._id}
            onActivate={(element) => handleActivate(section._id, element)}
            title={section.title}
            description={section.description ?? ""}
            section={section}
            activeCardId={activeCardId}
            onCardActivate={handleActivate}
            onTitleChange={(value) =>
              updateSection(section._id, { title: value })
            }
            onDescriptionChange={(value) =>
              updateSection(section._id, { description: value })
            }
            onQuestionChange={(questionId, patch) =>
              updateQuestion(section._id, questionId, patch)
            }
          />
        );
      })}
      <TopRightSlot>
        <Link to={"/"}>
          <AppButton variant="contained">{`${he.homePage.homeButton}`}</AppButton>
        </Link>
      </TopRightSlot>
      <BottomLeftStack>
        <AppButton variant="contained">{`${he.schema.creation.saveButtonText}`}</AppButton>
        <AppButton variant="contained">{`${he.schema.creation.publishSchemaButtonText}`}</AppButton>
      </BottomLeftStack>

      <Toolbar
        anchorEl={anchorEl}
        onAddSection={handleAddSection}
        onAddQuestion={handleAddQuestion}
      />
    </>
  );
};

export default SchemaEditPage;
