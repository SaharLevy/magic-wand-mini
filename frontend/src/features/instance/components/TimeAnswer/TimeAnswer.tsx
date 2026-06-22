import { DateAndTimeInput } from "../DateAnswer/DateAnswer.styles";

interface TimeAnswerProps {
  time?: string;
  readOnly?: boolean;
  onChange: (patch: { time?: string }) => void;
}

const TimeAnswer = ({ time, readOnly, onChange }: TimeAnswerProps) => {
  return (
    <DateAndTimeInput
      type="time"
      value={time ?? ""}
      disabled={readOnly}
      onChange={(e) => onChange({ time: e.target.value || undefined })}
    />
  );
};

export default TimeAnswer;
