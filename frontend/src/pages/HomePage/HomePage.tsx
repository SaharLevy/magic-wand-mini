import { useNavigate } from "react-router-dom";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import {
  useCreateSchema,
  useDeleteSchema,
  useGetSchemas,
} from "../../features/schema/hooks/useSchema";
import { he } from "../../shared/constants/i18";
import { SchemaStatus } from "../../features/schema/schemaTypes";
import { Carousel } from "./components/Carousel/Carousel";
import { FormCard } from "./components/FormCard/FormCard";
import { SchemaDraftActions } from "./components/DraftActions/SchemaDraftActions";
import { FillButton } from "./components/Buttons/FillButton";
import { PageContainer } from "./HomePage.styles";
import { TopRightSlot } from "../SchemaEditPage/SchemaEditPage.styles";

export enum ButtonStatus {
  Delete = "Delete",
  Edit = "Edit",
  Fill = "Fill",
  View = "View",
}

const HomePage = () => {
  const navigate = useNavigate();
  const { createSchema, createIsPending } = useCreateSchema();
  const { deleteSchema, deleteIsPending } = useDeleteSchema();
  const { schemas } = useGetSchemas();

  const draftSchemas = schemas?.filter(
    (schema) => schema.status === SchemaStatus.Draft,
  );
  const publishedSchemas = schemas?.filter(
    (schema) => schema.status === SchemaStatus.Published,
  );

  const handleCreate = () => {
    createSchema(undefined, {
      onSuccess: (newSchema) => navigate(`/schemas/${newSchema._id}`),
    });
  };

  const handleDelete = (schemaId: string) => {
    deleteSchema(schemaId);
  };

  return (
    <PageContainer>
      <TopRightSlot>
        <AppButton
          variant="contained"
          onClick={handleCreate}
          disabled={createIsPending}
        >
          {createIsPending
            ? `${he.homePage.creatingSchema}`
            : `${he.homePage.createNewForm}`}
        </AppButton>
      </TopRightSlot>

      <Carousel heading={he.homePage.draftSchemas}>
        {draftSchemas.map((schema) => (
          <FormCard
            key={schema._id}
            formTitle={schema.title}
            actions={
              <SchemaDraftActions
                formId={schema._id}
                onDelete={handleDelete}
                isPending={deleteIsPending}
              />
            }
          />
        ))}
      </Carousel>

      <Carousel heading={he.homePage.publishedSchemas}>
        {publishedSchemas.map((schema) => (
          <FormCard
            key={schema._id}
            formTitle={schema.title}
            actions={
              <FillButton onClick={() => navigate(`/schemas/${schema._id}`)} />
            }
          />
        ))}
      </Carousel>
    </PageContainer>
  );
};

export default HomePage;
