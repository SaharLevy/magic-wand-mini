import { useNavigate } from "react-router-dom";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import { useCreateSchema } from "../../features/schema/hooks/useSchema";

const HomePage = () => {
  const navigate = useNavigate();
  const { createSchema, isPending } = useCreateSchema();

  const handleCreate = () => {
    createSchema(undefined, {
      onSuccess: (newSchema) => navigate(`/schemas/${newSchema._id}`),
    });
  };
  return (
    <>
      <AppButton
        variant="contained"
        onClick={handleCreate}
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create new form"}
      </AppButton>
    </>
  );
};

export default HomePage;
