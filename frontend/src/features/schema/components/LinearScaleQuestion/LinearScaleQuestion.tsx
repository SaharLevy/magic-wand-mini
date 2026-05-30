import {
  NumberContainer,
  ScaleInput,
  ScaleMenuItem,
  ScaleNumberContainer,
  ScaleSelect,
  ViewContainer,
} from "./LinearScaleQuestion.styles";
import {
  ContainerX,
  ContainerY,
} from "../../../../shared/components/CardContainer/CardContainer.styles";
import { RadioIcon } from "../RadioQuestion/RadioQuestion.styles";
import { he } from "../../../../shared/constants/i18";
import type { IQuestionUpdate } from "../../schemaTypes";

interface QuestionCardProps {
  isActive: boolean;
  scaleMin: number;
  scaleMax: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  onChange: (patch: IQuestionUpdate) => void;
}

const MIN_VALUES = [0, 1];
const MAX_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const LinearScaleQuestion = ({
  isActive,
  scaleMin,
  scaleMax,
  scaleMinLabel,
  scaleMaxLabel,
  onChange,
}: QuestionCardProps) => {
  return !isActive ? (
    <ViewContainer>
      <ContainerY>{scaleMinLabel}</ContainerY>
      {Array.from(
        { length: scaleMax - scaleMin + 1 },
        (_, i) => scaleMin + i,
      ).map((value) => (
        <ScaleNumberContainer>
          <ScaleNumberContainer key={value}>{value}</ScaleNumberContainer>
          <RadioIcon />
        </ScaleNumberContainer>
      ))}
      <ContainerY>{scaleMaxLabel}</ContainerY>
    </ViewContainer>
  ) : (
    <>
      <ContainerX paddingRight="1rem">
        <ScaleSelect
          value={scaleMin}
          variant="standard"
          autoWidth={true}
          onChange={(e) => onChange({ scaleMin: Number(e.target.value) })}
        >
          {MIN_VALUES.map((number) => (
            <ScaleMenuItem key={number} value={number}>
              {number}
            </ScaleMenuItem>
          ))}
        </ScaleSelect>

        <ScaleSelect
          value={scaleMax}
          variant="standard"
          autoWidth={true}
          onChange={(e) => onChange({ scaleMax: Number(e.target.value) })}
        >
          {MAX_VALUES.map((number) => (
            <ScaleMenuItem key={number} value={number}>
              {number}
            </ScaleMenuItem>
          ))}
        </ScaleSelect>
      </ContainerX>

      <ContainerY paddingTop="2rem">
        <ContainerX>
          <NumberContainer> {scaleMin}</NumberContainer>
          <ScaleInput
            placeholder={he.schema.creation.titlePlaceholder}
            multiline
            defaultValue={scaleMinLabel}
            onBlur={(e) => onChange({ scaleMinLabel: e.target.value })}
          />
        </ContainerX>
        <ContainerX>
          <NumberContainer> {scaleMax}</NumberContainer>
          <ScaleInput
            placeholder={he.schema.creation.titlePlaceholder}
            multiline
            defaultValue={scaleMaxLabel}
            onBlur={(e) => onChange({ scaleMaxLabel: e.target.value })}
          />
        </ContainerX>
      </ContainerY>
    </>
  );
};

export default LinearScaleQuestion;
