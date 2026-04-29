import BaseQuestion from "../../../features/schema/components/BaseQuestion/BaseQuestion";
import RadioQuestion from "../../../features/schema/components/RadioQuestion/RadioQuestion";
import TextQuestion from "../../../features/schema/components/TextQuestion/TextQuestion";
import FormHeaderCard from "../FormHeaderCard/FormHeaderCard";
import { SectionContainer } from "./SectionWrapper.styles";

interface SectionWrapperProps {
  activeCardId: string | null;
  onCardClick: (cardId: string) => void;
}

const SectionWrapper = ({ activeCardId, onCardClick }: SectionWrapperProps) => {
  return (
    <SectionContainer>
      <FormHeaderCard
        isActive={activeCardId === "header"}
        onActivate={() => onCardClick("header")}
      />

      <BaseQuestion
        isActive={activeCardId === "q3"}
        onActivate={() => onCardClick("q3")}
      />
    </SectionContainer>
  );
};

export default SectionWrapper;
