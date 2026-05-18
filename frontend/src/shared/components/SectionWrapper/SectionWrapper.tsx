import {
  CardContainer,
  PageContainer,
  SectionContainer,
  SectionHeader,
} from "./SectionWrapper.styles";

const sectionHeaderText = (sectionIndex: number, sectionsCount: number) =>
  `סעיף ${sectionIndex} מתוך ${sectionsCount}`;

interface SectionWrapperProps {
  activeCardId: string | null;
  sectionIndex: number;
  sectionsCount: number;
}

const SectionWrapper = ({
  activeCardId,
  sectionIndex,
  sectionsCount,
}: SectionWrapperProps) => {
  return (
    <PageContainer>
      <SectionContainer>
        <SectionHeader>{sectionHeaderText(sectionIndex,sectionsCount)}</SectionHeader>

        <CardContainer></CardContainer>
      </SectionContainer>
      {/* <FormHeaderCard
        isActive={activeCardId === "header"}
        onActivate={() => onCardClick("header")}
      />

      <BaseQuestion
        isActive={activeCardId === "q3"}
        onActivate={() => onCardClick("q3")}
      /> */}
    </PageContainer>
  );
};

export default SectionWrapper;
