import { Radio } from "@mui/material";
import {
  EndLabel,
  ScaleColumn,
  ScaleContainer,
  ScaleGroup,
  ScaleNumber,
} from "./LinearScaleAnswer.styles";

interface LinearScaleAnswerProps {
  scaleMin: number;
  scaleMax: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  scaleNumber?: number;
  onChange: (patch: { scaleNumber?: number }) => void;
}

const range = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, i) => min + i);

const LinearScaleAnswer = ({
  scaleMin,
  scaleMax,
  scaleMinLabel,
  scaleMaxLabel,
  scaleNumber,
  onChange,
}: LinearScaleAnswerProps) => {
  return (
    <ScaleContainer>
      {scaleMaxLabel && <EndLabel>{scaleMaxLabel}</EndLabel>}

      <ScaleGroup
        row
        value={scaleNumber !== undefined ? String(scaleNumber) : ""}
        onChange={(e) => onChange({ scaleNumber: Number(e.target.value) })}
      >
        {range(scaleMin, scaleMax).map((num) => (
          <ScaleColumn key={num}>
            <ScaleNumber>{num}</ScaleNumber>
            <Radio value={String(num)} />
          </ScaleColumn>
        ))}
      </ScaleGroup>

      {scaleMinLabel && <EndLabel>{scaleMinLabel}</EndLabel>}
    </ScaleContainer>
  );
};

export default LinearScaleAnswer;
