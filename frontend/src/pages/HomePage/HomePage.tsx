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
import { PageContainer } from "./HomePage.styles";
import { TopRightSlot } from "../SchemaEditPage/SchemaEditPage.styles";
import { ActionButton } from "./components/Buttons/ActionButton";
import {
  useCreateInstance,
  useDeleteInstance,
  useGetInstances,
} from "../../features/instance/hooks/useInstance";
import { InstanceStatus } from "../../features/instance/instanceTypes";
import { InstanceDraftActions } from "./components/DraftActions/InstanceDraftActions";

export enum ButtonStatus {
  DELETE = "מחיקה",
  EDIT = "עריכה",
  FILL = "מילוי",
  VIEW = "צפייה",
}

const HomePage = () => {
  const navigate = useNavigate();
  const { createSchema, createIsPending } = useCreateSchema();
  const { deleteSchema, deleteIsPending } = useDeleteSchema();
  const { deleteInstance, deleteIsPending: deleteInstanceIsPending } =
    useDeleteInstance();

  const { createInstance, createIsPending: createInstanceIsPending } =
    useCreateInstance();
  const { schemas } = useGetSchemas();
  const { instances } = useGetInstances();

  const draftSchemas = schemas?.filter(
    (schema) => schema.status === SchemaStatus.Draft,
  );
  const publishedSchemas = schemas?.filter(
    (schema) => schema.status === SchemaStatus.Published,
  );
  const draftInstances = instances?.filter(
    (instance) => instance.status === InstanceStatus.Draft,
  );
  const publishedInstances = instances?.filter(
    (instance) => instance.status === InstanceStatus.Published,
  );

  const handleCreate = () => {
    createSchema(undefined, {
      onSuccess: (newSchema) => navigate(`/schemas/${newSchema._id}`),
    });
  };

  const handleFill = (schemaId: string) => {
    createInstance(schemaId, {
      onSuccess: (newInstance) => navigate(`/instances/${newInstance._id}`),
    });
  };

  const handleDelete = (schemaId: string) => {
    deleteSchema(schemaId);
  };

  const handleDeleteInstance = (instanceId: string) => {
    deleteInstance(instanceId);
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
              <ActionButton
                onClick={() => handleFill(schema._id)}
                buttonType={ButtonStatus.FILL}
              />
            }
          />
        ))}
      </Carousel>

      <Carousel heading={he.homePage.draftInstances}>
        {draftInstances.map((instance) => (
          <FormCard
            key={instance._id}
            formTitle={instance.schemaId.title}
            actions={
              <InstanceDraftActions
                formId={instance._id}
                onDelete={handleDeleteInstance}
                isPending={deleteInstanceIsPending}
              />
            }
          />
        ))}
      </Carousel>

      <Carousel heading={he.homePage.publishedInstances}>
        {publishedInstances.map((instance) => (
          <FormCard
            key={instance._id}
            formTitle={instance.schemaId.title}
            actions={
              <ActionButton
                onClick={() => navigate(`/instances/${instance._id}`)}
                buttonType={ButtonStatus.VIEW}
              />
            }
          />
        ))}
      </Carousel>
    </PageContainer>
  );
};

export default HomePage;
