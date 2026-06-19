import { DateAndTimeInput } from "./DateAnswer.styles";

interface DateAnswerProps {
  date?: string;
  onChange: (patch: { date?: string }) => void;
}

const DateAnswer = ({ date, onChange }: DateAnswerProps) => {
  return (
    <DateAndTimeInput
      type="date"
      value={date ?? ""}
      onChange={(e) => onChange({ date: e.target.value || undefined })}
    />
  );
};

export default DateAnswer;
