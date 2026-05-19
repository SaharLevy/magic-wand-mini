import { he } from "../../constants/i18";
import { CardContainer } from "../CardContainer/CardContainer.styles";
import {
  ViewDescription,
  ViewTitle,
} from "../FormHeaderCard/FormHeaderCard.styles";
import TitleAndDescription from "../TitleAndDescription/TitleAndDescription";
import {
  PageContainer,
  SectionContainer,
  SectionHeader,
} from "./SectionWrapper.styles";

export const sectionHeaderText = (
  sectionIndex: number,
  sectionsCount: number,
) => `סעיף ${sectionIndex} מתוך ${sectionsCount}`;

interface SectionWrapperProps {
  isActive: boolean;
  onActivate: () => void;
  sectionIndex: number;
  sectionsCount: number;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const SectionWrapper = ({
  isActive,
  onActivate,
  sectionIndex,
  sectionsCount,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: SectionWrapperProps) => {
  return (
    <PageContainer>
      <SectionContainer>
        <SectionHeader>
          {sectionHeaderText(sectionIndex, sectionsCount)}
        </SectionHeader>
        <CardContainer
          isActive={isActive}
          onClick={onActivate}
          isSection={true}
        >
          {isActive ? (
            <TitleAndDescription
              title={title}
              description={description}
              onTitleChange={onTitleChange}
              onDescriptionChange={onDescriptionChange}
              isSection={true}
            />
          ) : (
            <>
              <ViewTitle>
                {title || he.schema.creation.defaultTitleSection}
              </ViewTitle>
              <ViewDescription>
                {description || he.schema.creation.defaultDescriptionSection}
              </ViewDescription>
            </>
          )}
        </CardContainer>
      </SectionContainer>
    </PageContainer>
  );
};

export default SectionWrapper;
