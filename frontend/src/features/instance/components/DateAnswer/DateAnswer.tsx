import { DateAndTimeInput } from "./DateAnswer.styles";

interface DateAnswerProps {
  date?: string;
  readOnly?: boolean;
  onChange: (patch: { date?: string }) => void;
}

const DateAnswer = ({ date, readOnly, onChange }: DateAnswerProps) => {
  return (
    <DateAndTimeInput
      type="date"
      value={date ?? ""}
      disabled={readOnly}
      onChange={(e) => onChange({ date: e.target.value || undefined })}
    />
  );
};

export default DateAnswer;
