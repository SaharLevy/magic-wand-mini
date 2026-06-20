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
  onSubmit: () => void;
  submitIsPending: boolean;
}

const SectionPagination = ({
  isFirstPage,
  isLastPage,
  onPrev,
  onNext,
  onSubmit,
  submitIsPending,
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

      <AppButton
        variant="contained"
        onClick={onSubmit}
        disabled={!isLastPage || submitIsPending}
      >
        {he.instance.creation.submit}
      </AppButton>
    </SectionsButtonsContainer>
  );
};

export default SectionPagination;
