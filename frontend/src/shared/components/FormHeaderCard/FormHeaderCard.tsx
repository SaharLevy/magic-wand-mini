import { useState } from "react";
import { CardContainer } from "../CardContainer/CardContainer.styles";
import {
  DescriptionInput,
  TitleInput,
  ViewDescription,
  ViewTitle,
} from "./FormHeaderCard.styles";

interface FormHeaderCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const FormHeaderCard = ({ isActive, onActivate }: FormHeaderCardProps) => {
  const [title, setTitle] = useState("טופס ללא כותרת");
  const [description, setDescription] = useState("");

  return (
    <CardContainer isHeader={true} isActive={isActive} onClick={onActivate}>
      {isActive ? (
        <>
          <TitleInput
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="טופס ללא כותרת"
          />
          <DescriptionInput
            fullWidth
            multiline
            placeholder="תיאור טופס"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      ) : (
        <div>
          <ViewTitle>{title || "טופס ללא כותרת"}</ViewTitle>
          <ViewDescription>{description || "תיאור טופס"}</ViewDescription>
        </div>
      )}
    </CardContainer>
  );
};

export default FormHeaderCard;
