import { DateAndTimeInput } from "../DateAnswer/DateAnswer.styles";

interface TimeAnswerProps {
  time?: string;
  onChange: (patch: { time?: string }) => void;
}

const TimeAnswer = ({ time, onChange }: TimeAnswerProps) => {
  return (
    <DateAndTimeInput
      type="time"
      value={time ?? ""}
      onChange={(e) => onChange({ time: e.target.value || undefined })}
    />
  );
};

export default TimeAnswer;
