import { useEffect, useState } from "react";
import { he } from "../../shared/constants/i18";
import { useCreateSchema } from "../../features/schema/hooks/useSchema";
import FormHeaderCard from "../../shared/components/FormHeaderCard/FormHeaderCard";
import SectionWrapper from "../../shared/components/SectionWrapper/SectionWrapper";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import Toolbar from "../../shared/components/Toolbar/Toolbar";

//TODO: move the creation into the button click handler, not the page mount, and then navigate with the new schema's ID in the URL

const SchemaCreationPage = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>("");
  const [title, setTitle] = useState(he.schema.creation.defaultTitleSchema);
  const [description, setDescription] = useState("");
  const [sectionsCount, setSectionsCount] = useState(1);

  const { createSchema, schema, isPending, isError } = useCreateSchema();

  useEffect(() => {
    createSchema();
  }, []);

  useEffect(() => {
    if (schema) {
      setTitle(schema.title);
      setDescription(schema.description ?? "");
    }
  }, [schema]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <FormHeaderCard
        isActive={activeCardId === "header"}
        onActivate={() => setActiveCardId("header")}
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        sectionsCount={sectionsCount}
      />
      <SectionWrapper
        sectionIndex={2}
        sectionsCount={4}
        isActive={activeCardId === "lol"}
        onActivate={() => setActiveCardId("lol")}
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />

      <AppButton variant="contained">Home</AppButton>
      <Toolbar/>
    </>
  );
};

export default SchemaCreationPage;
