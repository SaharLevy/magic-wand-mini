import { useState } from "react";
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

interface QuestionCardProps {
  isActive: boolean;
  onActivate: () => void;
}

const enum MinScaleType {
  Zero = 0,
  One = 1,
}

const enum MaxScaleType {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
}

const LinearScaleQuestion = ({ isActive, onActivate }: QuestionCardProps) => {
  const [minScale, setMinScale] = useState<MinScaleType>(MinScaleType.One);
  const [minScaleInput, setMinScaleInput] = useState<string>();
  const [maxScale, setMaxScale] = useState<MaxScaleType>(MaxScaleType.Five);
  const [maxScaleInput, setMaxScaleInput] = useState<string>();

  return !isActive ? (
    <ViewContainer>
      <ContainerY>{minScaleInput}</ContainerY>
      {Array.from(
        { length: maxScale - minScale + 1 },
        (_, i) => minScale + i,
      ).map((value) => (
        <ScaleNumberContainer>
          <ScaleNumberContainer key={value}>{value}</ScaleNumberContainer>
          <RadioIcon />
        </ScaleNumberContainer>
      ))}
      <ContainerY>{maxScaleInput}</ContainerY>
    </ViewContainer>
  ) : (
    <>
      <ContainerX paddingRight="1rem">
        <ScaleSelect
          value={minScale}
          variant="standard"
          autoWidth={true}
          onChange={(e) => setMinScale(e.target.value as MinScaleType)}
        >
          <ScaleMenuItem value={MinScaleType.Zero}>{0}</ScaleMenuItem>
          <ScaleMenuItem value={MinScaleType.One}>{1}</ScaleMenuItem>
        </ScaleSelect>

        <ScaleSelect
          value={maxScale}
          variant="standard"
          autoWidth={true}
          onChange={(e) => setMaxScale(e.target.value as MaxScaleType)}
        >
          <ScaleMenuItem value={MaxScaleType.Three}>{3}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Four}>{4}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Five}>{5}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Six}>{6}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Seven}>{7}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Eight}>{8}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Nine}>{9}</ScaleMenuItem>
          <ScaleMenuItem value={MaxScaleType.Ten}>{10}</ScaleMenuItem>
        </ScaleSelect>
      </ContainerX>

      <ContainerY paddingTop="2rem">
        <ContainerX>
          <NumberContainer> {minScale}</NumberContainer>
          <ScaleInput
            placeholder="תווית (אופציונאלי)"
            multiline
            defaultValue={minScaleInput}
            onBlur={(e) => {
              setMinScaleInput(e.target.value);
            }}
          />
        </ContainerX>
        <ContainerX>
          <NumberContainer> {maxScale}</NumberContainer>
          <ScaleInput
            placeholder="תווית (אופציונאלי)"
            multiline
            defaultValue={maxScaleInput}
            onBlur={(e) => {
              setMaxScaleInput(e.target.value);
            }}
          />
        </ContainerX>
      </ContainerY>
    </>
  );
};

export default LinearScaleQuestion;
