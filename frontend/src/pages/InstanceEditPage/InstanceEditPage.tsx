import { useParams } from "react-router-dom";
import InstanceHeader from "../../features/instance/components/InstanceHeader/InstanceHeader";
import { useGetInstance } from "../../features/instance/hooks/useInstance";
import { useInstanceDraft } from "../../features/instance/hooks/useInstanceDraft";
import BaseAnswer from "../../features/instance/components/BaseAnswer/BaseAnswer";
import { useState } from "react";
import SectionPagination from "../../features/instance/components/SectionPagination/SectionPagination";
import { PageContainer } from "../../shared/components/SectionWrapper/SectionWrapper.styles";

const InstanceEditPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();

  const { instance, isPending, isError } = useGetInstance(instanceId);
  const { instanceDraft, updateAnswer } = useInstanceDraft(instance);

  const [pageIndex, setPageIndex] = useState(0);

  if (isPending || !instanceDraft) return <div>טוען...</div>;
  if (isError || !instance) return <div>שגיאה בטעינת המופע</div>;

  const schema = instance.schemaId;
  const schemaSection = schema.sections[pageIndex];
  const answerSection = instanceDraft.sections.find(
    (candidate) => candidate.sectionId === schemaSection._id,
  );
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === schema.sections.length - 1;

  return (
    <PageContainer>
      <InstanceHeader
        title={instance.schemaId.title}
        description={instance.schemaId.description ?? ""}
      />
      {answerSection &&
        schemaSection.questions.map((question) => {
          const answer = answerSection.answers.find(
            (candidate) => candidate.questionId === question._id,
          );
          if (!answer) return null;

          return (
            <BaseAnswer
              key={question._id}
              question={question}
              answer={answer}
              onChange={(patch) =>
                updateAnswer(schemaSection._id, question._id, patch)
              }
            />
          );
        })}

      <SectionPagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        onPrev={() => setPageIndex((index) => index - 1)}
        onNext={() => setPageIndex((index) => index + 1)}
      />
    </PageContainer>
  );
};

export default InstanceEditPage;
