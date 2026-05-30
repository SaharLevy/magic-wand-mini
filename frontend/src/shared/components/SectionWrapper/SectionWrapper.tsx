import BaseQuestion from "../../../features/schema/components/BaseQuestion/BaseQuestion";
import type {
  IQuestionUpdate,
  ISection,
} from "../../../features/schema/schemaTypes";
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
  onActivate: (element: HTMLElement) => void;
  sectionIndex: number;
  sectionsCount: number;
  title: string;
  description: string;
  section: ISection;
  activeCardId: string | null;
  onCardActivate: (cardId: string, element: HTMLElement) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onQuestionChange: (questionId: string, patch: IQuestionUpdate) => void;
  onDeleteQuestion: (sectionId: string, questionId: string) => void;
}

const SectionWrapper = ({
  isActive,
  onActivate,
  sectionIndex,
  sectionsCount,
  title,
  description,
  section,
  activeCardId,
  onCardActivate,
  onTitleChange,
  onDescriptionChange,
  onQuestionChange,
  onDeleteQuestion,
}: SectionWrapperProps) => {
  return (
    <PageContainer>
      <SectionContainer>
        <SectionHeader>
          {sectionHeaderText(sectionIndex, sectionsCount)}
        </SectionHeader>
        <CardContainer
          isActive={isActive}
          onClick={(e) => onActivate(e.currentTarget)}
          isSection={true}
        >
          {isActive ? (
            <TitleAndDescription
              title={section.title}
              description={section.description}
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

        {section.questions.map((question) => (
          <BaseQuestion
            key={question._id}
            question={question}
            isActive={activeCardId === question._id}
            onActivate={(element) => onCardActivate(question._id, element)}
            onChange={(patch) => onQuestionChange(question._id, patch)}
            onDelete={() => onDeleteQuestion(section._id, question._id)}
          />
        ))}
      </SectionContainer>
    </PageContainer>
  );
};

export default SectionWrapper;
