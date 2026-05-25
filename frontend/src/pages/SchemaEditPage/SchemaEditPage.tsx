import { useEffect, useState } from "react";
import {
  useCreateQuestion,
  useGetSchema,
} from "../../features/schema/hooks/useSchema";
import FormHeaderCard from "../../shared/components/FormHeaderCard/FormHeaderCard";
import SectionWrapper from "../../shared/components/SectionWrapper/SectionWrapper";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import Toolbar from "../../shared/components/Toolbar/Toolbar";
import { useParams } from "react-router-dom";
import { useCreateSection } from "../../features/schema/hooks/useSchema";
import { he } from "../../shared/constants/i18";
import type { ISchema } from "../../features/schema/schemaTypes";

// type SectionDraft = { title: string; description: string };

const SchemaEditPage = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schemaDraft, setSchemaDraft] = useState<ISchema | null>(null);

  const { schema, isPending, isError } = useGetSchema(schemaId);
  const { createSection } = useCreateSection(schemaId);
  const { createQuestion } = useCreateQuestion(schemaId);

  const activeSectionId =
    activeCardId && activeCardId !== "header" ? activeCardId : null;

  const handleAddQuestion = activeSectionId
    ? () => createQuestion(activeSectionId)
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

  const sectionsCount = schema.sections.length + 1;

  return (
    <>
      <FormHeaderCard
        isActive={activeCardId === "header"}
        onActivate={(el) => handleActivate("header", el)}
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        sectionsCount={sectionsCount}
      />
      {schema.sections.map((section, index) => {
        const draft = sectionDrafts[section._id] ?? {
          ...section,
          description: section.description ?? "",
        };
        return (
          <SectionWrapper
            key={section._id}
            sectionIndex={index + 2}
            sectionsCount={sectionsCount}
            isActive={activeCardId === section._id}
            onActivate={(el) => handleActivate(section._id, el)}
            title={draft.title}
            description={draft.description}
            section={draft}
            onTitleChange={(value) =>
              updateSectionDraft(section._id, { title: value })
            }
            onDescriptionChange={(value) =>
              updateSectionDraft(section._id, { description: value })
            }
          />
        );
      })}

      <AppButton variant="contained">{`${he.homePage.homeButton}`}</AppButton>
      <Toolbar
        anchorEl={anchorEl}
        onAddSection={() => createSection()}
        onAddQuestion={handleAddQuestion}
      />
    </>
  );
};

export default SchemaEditPage;
