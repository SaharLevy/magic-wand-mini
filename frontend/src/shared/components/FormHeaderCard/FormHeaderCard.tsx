import { CardContainer } from "../CardContainer/CardContainer.styles";
import {
  DescriptionInput,
  TitleInput,
  ViewDescription,
  ViewTitle,
} from "./FormHeaderCard.styles";
import { he } from "../../constants/i18";
import {
  PageContainer,
  SectionContainer,
  SectionHeader,
} from "../SectionWrapper/SectionWrapper.styles";
import TitleAndDescription from "../TitleAndDescription/TitleAndDescription";
import { sectionHeaderText } from "../SectionWrapper/SectionWrapper";

interface FormHeaderCardProps {
  isActive: boolean;
  onActivate: () => void;
  title: string;
  description: string;
  sectionsCount: number;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const FormHeaderCard = ({
  isActive,
  onActivate,
  title,
  description,
  sectionsCount,
  onTitleChange,
  onDescriptionChange,
}: FormHeaderCardProps) => {
  return (
    <PageContainer>
      <SectionContainer>
        <SectionHeader>{sectionHeaderText(1, sectionsCount)}</SectionHeader>
        <CardContainer isHeader={true} isActive={isActive} onClick={onActivate}>
          {isActive ? (
            <TitleAndDescription
              title={title}
              description={description}
              onTitleChange={onTitleChange}
              onDescriptionChange={onDescriptionChange}
            />
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
      </SectionContainer>
    </PageContainer>
  );
};

export default FormHeaderCard;
