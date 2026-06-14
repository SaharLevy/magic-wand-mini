import { CardContainer } from "../../../../shared/components/CardContainer/CardContainer.styles";
import QuestionHeader from "../../../../shared/components/QuestionHeader/QuestionHeader";
import { ViewTitle } from "../../../../shared/components/QuestionHeader/QuestionHeader.styles";
import { he } from "../../../../shared/constants/i18";
import QuestionFooter from "../../../../shared/components/QuestionFooter/QuestionFooter";
import { QuestionTypes } from "../../../../shared/sharedTypes";
import type { IAnswer } from "../../instanceTypes";
import TextAnswer from "../TextAnswer/TextAnswer";
import type { IQuestion } from "../../../schema/schemaTypes";

interface BaseAnswerProps {
  question: IQuestion;
  answer: IAnswer;
  onChange: (patch: Partial<IAnswer>) => void;
}

const BaseAnswer = ({ question, answer, onChange }: BaseAnswerProps) => {
  return (
    <CardContainer>
      <ViewTitle>
        {question.title || he.schema.creation.baseQuestionDefaultText}
      </ViewTitle>

      {(() => {
        switch (answer.type) {
          case QuestionTypes.SHORT_TEXT:
            return (
              <TextAnswer
                isParagraph={false}
                value={answer.text}
                onChange={(text) => onChange({ text })}
              />
            );
          case QuestionTypes.PARAGRAPH:
            return (
              <TextAnswer
                isParagraph={true}
                value={answer.text}
                onChange={(text) => onChange({ text })}
              />
            );
          // case QuestionTypes.RADIO:
          //   return (
          //     <RadioQuestion
          //       isActive={isActive}
          //       options={question.options}
          //       onChange={(options) => onChange({ options })}
          //     />
          //   );
          // case QuestionTypes.CHECKBOX:
          //   return (
          //     <CheckboxQuestion
          //       isActive={isActive}
          //       options={question.options}
          //       onChange={(options) => onChange({ options })}
          //     />
          //   );
          // case QuestionTypes.DROPDOWN:
          //   return (
          //     <DropdownQuestion
          //       isActive={isActive}
          //       options={question.options}
          //       onChange={(options) => onChange({ options })}
          //     />
          //   );
          // case QuestionTypes.LINEAR_SCALE:
          //   return (
          //     <LinearScaleQuestion
          //       isActive={isActive}
          //       scaleMin={question.scaleMin}
          //       scaleMax={question.scaleMax}
          //       scaleMinLabel={question.scaleMinLabel}
          //       scaleMaxLabel={question.scaleMaxLabel}
          //       onChange={onChange}
          //     />
          //   );
          // case QuestionTypes.RADIO_TABLE:
          //   return (
          //     <RadioTableQuestion
          //       isActive={isActive}
          //       rows={question.rows}
          //       columns={question.columns}
          //       onRowsChange={(rows) => onChange({ rows })}
          //       onColumnsChange={(columns) => onChange({ columns })}
          //     />
          //   );
          // case QuestionTypes.CHECKBOX_TABLE:
          //   return (
          //     <CheckboxTableQuestion
          //       isActive={isActive}
          //       rows={question.rows}
          //       columns={question.columns}
          //       onRowsChange={(rows) => onChange({ rows })}
          //       onColumnsChange={(columns) => onChange({ columns })}
          //     />
          //   );
          // case QuestionTypes.DATE:
          //   return <DateQuestion isActive={isActive} />;
          // case QuestionTypes.TIME:
          //   return <TimeQuestion isActive={isActive} />;
          default:
            return null;
        }
      })()}
      {/* {isActive && (
        <QuestionFooter
          isRequired={question.required}
          onQuestionChange={(value) => onChange({ required: value })}
          questionDeleteHandler={onDelete}
        />
      )} */}
    </CardContainer>
  );
};

export default BaseAnswer;
