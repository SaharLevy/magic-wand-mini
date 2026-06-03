import { useNavigate } from "react-router-dom";
import { AppButton } from "../../shared/components/AppButton/AppButton.styles";
import { useCreateSchema } from "../../features/schema/hooks/useSchema";
import { he } from "../../shared/constants/i18";

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
        {isPending
          ? `${he.homePage.creatingSchema}`
          : `${he.homePage.createNewForm}`}
      </AppButton>
    </>
  );
};

export default HomePage;
