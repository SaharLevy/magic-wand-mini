import type { ReactNode } from "react";
import {
  StyledCard,
  CardBody,
  CardTitle,
  CardButtons,
} from "./FormCard.styles";

interface FormCardProps {
  formTitle: string;
  actions: ReactNode;
}

export const FormCard = ({ formTitle, actions }: FormCardProps) => (
  <StyledCard variant="outlined">
    <CardBody>
      <CardTitle variant="subtitle1">{formTitle}</CardTitle>
    </CardBody>
    <CardButtons>{actions}</CardButtons>
  </StyledCard>
);
