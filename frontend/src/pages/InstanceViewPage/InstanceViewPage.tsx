import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetInstance } from "../../features/instance/hooks/useInstance";
import InstanceHeader from "../../features/instance/components/InstanceHeader/InstanceHeader";
import BaseAnswer from "../../features/instance/components/BaseAnswer/BaseAnswer";
import SectionPagination from "../../features/instance/components/SectionPagination/SectionPagination";
import { PageContainer } from "../../shared/components/SectionWrapper/SectionWrapper.styles";
import { he } from "../../shared/constants/i18";

const InstanceViewPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();
  const { instance, isPending, isError } = useGetInstance(instanceId);

  const [pageIndex, setPageIndex] = useState(0);

  if (isPending) return <div>{he.instance.creation.loadingInstance}</div>;
  if (isError || !instance)
    return <div>{he.instance.creation.loadingError}</div>;

  const schema = instance.schemaId;
  const schemaSection = schema.sections[pageIndex];
  const answerSection = instance.sections.find(
    (candidate) => candidate.sectionId === schemaSection._id,
  );
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === schema.sections.length - 1;

  return (
    <PageContainer>
      <InstanceHeader
        title={schema.title}
        description={schema.description ?? ""}
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
              readOnly
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

export default InstanceViewPage;
