import { CardContainer } from "../CardContainer/CardContainer.styles";
import {
  DescriptionInput,
  TitleInput,
  ViewDescription,
  ViewTitle,
} from "./FormHeaderCard.styles";
import { he } from "../../constants/i18";
import { PageContainer } from "../SectionWrapper/SectionWrapper.styles";

interface FormHeaderCardProps {
  isActive: boolean;
  onActivate: () => void;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const FormHeaderCard = ({
  isActive,
  onActivate,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: FormHeaderCardProps) => {
  return (
    <PageContainer>
      <CardContainer isHeader={true} isActive={isActive} onClick={onActivate}>
        {isActive ? (
          <>
            <TitleInput
              fullWidth
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={he.schema.creation.titlePlaceholder}
            />
            <DescriptionInput
              fullWidth
              multiline
              placeholder={he.schema.creation.descriptionPlaceholder}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </>
        ) : (
          <div>
            <ViewTitle>
              {title || he.schema.creation.titlePlaceholder}
            </ViewTitle>
            <ViewDescription>
              {description || he.schema.creation.descriptionPlaceholder}
            </ViewDescription>
          </div>
        )}
      </CardContainer>
    </PageContainer>
  );
};

export default FormHeaderCard;
