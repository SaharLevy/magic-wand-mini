import { useState } from "react";
import SectionWrapper from "../../shared/components/SectionWrapper/SectionWrapper";

const SchemaCreationPage = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>("");
  return (
    <SectionWrapper
      activeCardId={activeCardId}
      onCardClick={(cardId) => setActiveCardId(cardId)}
    />
  );
};

export default SchemaCreationPage;
