import { AppButton } from "../../../../shared/components/AppButton/AppButton.styles";
import { he } from "../../../../shared/constants/i18";
import {
  LeftSideButtonsContainer,
  SectionsButtonsContainer,
} from "./SectionPagination.styles";

interface SectionPaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const SectionPagination = ({
  isFirstPage,
  isLastPage,
  onPrev,
  onNext,
}: SectionPaginationProps) => {
  return (
    <SectionsButtonsContainer>
      <LeftSideButtonsContainer>
        <AppButton variant="contained" disabled={isLastPage} onClick={onNext}>
          {he.instance.creation.nextPage}
        </AppButton>
        <AppButton variant="contained" disabled={isFirstPage} onClick={onPrev}>
          {he.instance.creation.prevPage}
        </AppButton>
      </LeftSideButtonsContainer>

      <AppButton variant="contained">{he.instance.creation.submit}</AppButton>
    </SectionsButtonsContainer>
  );
};

export default SectionPagination;
