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

type SectionDraft = { title: string; description: string };

const SchemaEditPage = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sectionDrafts, setSectionDrafts] = useState<
    Record<string, SectionDraft>
  >({});

  const { schema, isPending, isError } = useGetSchema(schemaId);
  const { createSection } = useCreateSection(schemaId);
  const { createQuestion } = useCreateQuestion(schemaId);

  const activeSectionId =
    activeCardId && activeCardId !== "header" ? activeCardId : null;

  const handleAddQuestion = activeSectionId
    ? () => createQuestion(activeSectionId)
    : undefined;

  const handleActivate = (cardId: string, element: HTMLElement) => {
    setActiveCardId(cardId);
    setAnchorEl(element);
  };

  useEffect(() => {
    if (!schema) return;
    setTitle(schema.title);
    setDescription(schema.description ?? "");
    setSectionDrafts(
      Object.fromEntries(
        schema.sections.map((s) => [
          s._id,
          { title: s.title, description: s.description ?? "" },
        ]),
      ),
    );
  }, [schema]);

  if (isPending) return <div>Loading...</div>;
  if (isError || !schema) return <div>Error...</div>;

  const updateSectionDraft = (id: string, patch: Partial<SectionDraft>) => {
    setSectionDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };
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
          title: section.title,
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
            onTitleChange={(value) =>
              updateSectionDraft(section._id, { title: value })
            }
            onDescriptionChange={(value) =>
              updateSectionDraft(section._id, { description: value })
            }
          />
        );
      })}

      <AppButton variant="contained">Home</AppButton>
      <Toolbar
        anchorEl={anchorEl}
        onAddSection={() => createSection()}
        onAddQuestion={handleAddQuestion}
      />
    </>
  );
};

export default SchemaEditPage;
