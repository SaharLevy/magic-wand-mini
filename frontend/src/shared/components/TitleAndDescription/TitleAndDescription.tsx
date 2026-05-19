import { he } from "../../constants/i18";
import {
  DescriptionInput,
  TitleInput,
} from "../FormHeaderCard/FormHeaderCard.styles";

interface TitleAndDescriptionProps {
  title: string;
  isSection?: boolean;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const TitleAndDescription = ({
  title,
  isSection,
  description,
  onTitleChange,
  onDescriptionChange,
}: TitleAndDescriptionProps) => {
  return (
    <>
      <TitleInput
        fullWidth
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={
          isSection
            ? he.schema.creation.defaultTitleSection
            : he.schema.creation.titlePlaceholder
        }
      />
      <DescriptionInput
        fullWidth
        multiline
        placeholder={
          isSection
            ? he.schema.creation.defaultDescriptionSection
            : he.schema.creation.descriptionPlaceholder
        }
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </>
  );
};

export default TitleAndDescription;
