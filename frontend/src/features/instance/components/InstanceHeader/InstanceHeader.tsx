import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import {
  ViewDescription,
  ViewTitle,
} from "../../../../shared/components/FormHeaderCard/FormHeaderCard.styles";
import { SectionContainer } from "../../../../shared/components/SectionWrapper/SectionWrapper.styles";

interface InstanceHeaderProps {
  title: string;
  description: string;
}

const InstanceHeader = ({ title, description }: InstanceHeaderProps) => {
  return (
    <SectionContainer>
      <CardContainer isHeader={true}>
        <div>
          <ViewTitle>{title}</ViewTitle>
          <ViewDescription>{description}</ViewDescription>
        </div>
      </CardContainer>
    </SectionContainer>
  );
};

export default InstanceHeader;
