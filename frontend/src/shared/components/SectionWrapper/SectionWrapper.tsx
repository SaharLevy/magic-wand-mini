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

      <TextQuestion
        isActive={activeCardId === "q1"}
        onActivate={() => onCardClick("q1")}
      />
      <RadioQuestion
        isActive={activeCardId === "q2"}
        onActivate={() => onCardClick("q2")}
      />
    </SectionContainer>
  );
};

export default SectionWrapper;
