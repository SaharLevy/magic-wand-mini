import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import {
  ViewDescription,
  ViewTitle,
} from "../../../../shared/components/FormHeaderCard/FormHeaderCard.styles";
import { SectionContainer } from "../../../../shared/components/SectionWrapper/SectionWrapper.styles";

interface TitleCardProps {
  title: string;
  description: string;
  isHeader: boolean;
}

const TitleCard = ({ title, description, isHeader }: TitleCardProps) => {
  return (
    <SectionContainer>
      <CardContainer isHeader={isHeader}>
        <div>
          <ViewTitle>{title}</ViewTitle>
          <ViewDescription>{description}</ViewDescription>
        </div>
      </CardContainer>
    </SectionContainer>
  );
};

export default TitleCard;
