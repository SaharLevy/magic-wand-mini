import type { ReactNode } from "react";
import { Tooltip } from "@mui/material";
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
      <Tooltip title={formTitle}>
        <CardTitle variant="subtitle1">{formTitle}</CardTitle>
      </Tooltip>
    </CardBody>
    <CardButtons>{actions}</CardButtons>
  </StyledCard>
);
