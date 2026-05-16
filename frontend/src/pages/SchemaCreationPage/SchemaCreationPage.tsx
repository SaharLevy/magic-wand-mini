import { useEffect, useState } from "react";
import { he } from "../../shared/constants/i18";
import { useCreateSchema } from "../../features/schema/hooks/useSchema";
import FormHeaderCard from "../../shared/components/FormHeaderCard/FormHeaderCard";

//TODO: move the creation into the button click handler, not the page mount, and then navigate with the new schema's ID in the URL

const SchemaCreationPage = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>("");
  const [title, setTitle] = useState(he.schema.creation.defaultTitle);
  const [description, setDescription] = useState("");

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
      />
    </>
  );
};

export default SchemaCreationPage;
