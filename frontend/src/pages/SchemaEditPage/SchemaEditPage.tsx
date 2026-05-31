import { useState } from "react";
import {
  useCreateQuestion,
  useDeleteQuestion,
  useGetSchema,
  usePublishSchema,
  useUpdateSchema,
  useCreateSection,
} from "../../features/schema/hooks/useSchema";
import FormHeaderCard from "../../shared/components/FormHeaderCard/FormHeaderCard";
import SectionWrapper from "../../shared/components/SectionWrapper/SectionWrapper";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import Toolbar from "../../shared/components/Toolbar/Toolbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { he } from "../../shared/constants/i18";
import { SchemaStatus } from "../../features/schema/schemaTypes";
import { BottomLeftStack, TopRightSlot } from "./SchemaEditPage.styles";
import { useSchemaDraft } from "../../features/schema/hooks/useSchemaDraft";

const SchemaEditPage = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { schema, isPending, isError } = useGetSchema(schemaId);
  const { createSection } = useCreateSection(schemaId);
  const { createQuestion } = useCreateQuestion(schemaId);
  const { updateSchema: saveSchema, isPending: isSaving } = useUpdateSchema();
  const { deleteQuestion } = useDeleteQuestion(schemaId);
  const { publishSchema } = usePublishSchema(schemaId);
  const navigate = useNavigate();

  const {
    schemaDraft,
    updateSchema,
    updateSection,
    updateQuestion,
    addSection,
    addQuestion,
    removeQuestion,
    publishDraft,
  } = useSchemaDraft(schema);

  const activeSectionId =
    activeCardId && activeCardId !== "header" ? activeCardId : null;

  const handleAddQuestion = activeSectionId
    ? async () => {
        const newQuestion = await createQuestion(activeSectionId);
        addQuestion(activeSectionId, newQuestion);
      }
    : undefined;

  const handleDeleteQuestion = async (
    sectionId: string,
    questionId: string,
  ) => {
    await deleteQuestion({ sectionId, questionId });
    removeQuestion(sectionId, questionId);
  };

  const handleAddSection = async () => {
    const newSection = await createSection();
    addSection(newSection);
  };

  const handlePublishSchema = async () => {
    if (!schemaDraft) return;
    await publishSchema();
    publishDraft();
    navigate("/", { replace: true });
  };

  const handleActivate = (cardId: string, element: HTMLElement) => {
    setActiveCardId(cardId);
    setAnchorEl(element);
  };

  const handleSaveSchema = () => {
    if (!schemaDraft) return;
    saveSchema(schemaDraft);
  };

  if (isPending || !schemaDraft) return <div>Loading...</div>;
  if (isError || !schema) return <div>Error...</div>;

  const isPublished = schemaDraft.status === SchemaStatus.Published;

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
            onDeleteQuestion={handleDeleteQuestion}
          />
        );
      })}
      <TopRightSlot>
        <Link to={"/"}>
          <AppButton variant="contained">{`${he.homePage.homeButton}`}</AppButton>
        </Link>
      </TopRightSlot>
      <BottomLeftStack>
        <AppButton
          variant="contained"
          onClick={handleSaveSchema}
          disabled={isPublished}
        >{`${he.schema.creation.saveButtonText}`}</AppButton>
        <AppButton
          variant="contained"
          onClick={handlePublishSchema}
          disabled={isPublished}
        >{`${he.schema.creation.publishSchemaButtonText}`}</AppButton>
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
