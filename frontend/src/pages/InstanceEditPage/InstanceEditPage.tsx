import { useParams, useNavigate } from "react-router-dom";
import {
  useGetInstance,
  useSubmitInstance,
} from "../../features/instance/hooks/useInstance";
import { useInstanceDraft } from "../../features/instance/hooks/useInstanceDraft";
import BaseAnswer from "../../features/instance/components/BaseAnswer/BaseAnswer";
import { useState } from "react";
import SectionPagination from "../../features/instance/components/SectionPagination/SectionPagination";
import { PageContainer } from "../../shared/components/SectionWrapper/SectionWrapper.styles";
import { AxiosError } from "axios";
import type { ValidationErrorData } from "../../features/instance/instanceTypes";
import { he } from "../../shared/constants/i18";
import TitleCard from "../../features/instance/components/InstanceHeader/TitleCard";

const InstanceEditPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();

  const { instance, isPending, isError } = useGetInstance(instanceId);
  const { instanceDraft, updateAnswer } = useInstanceDraft(instance);
  const { submitInstance, submitIsPending } = useSubmitInstance();
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(0);
  const [errorQuestionIds, setErrorQuestionIds] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!instanceDraft) return;

    try {
      await submitInstance(instanceDraft);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data as ValidationErrorData;
        setErrorQuestionIds(data?.details ?? []);
      }
    }
  };

  if (isPending || !instanceDraft)
    return <div>{he.instance.creation.loadingInstance}</div>;

  if (isError || !instance)
    return <div>{he.instance.creation.loadingError}</div>;

  const schema = instance.schemaId;
  const schemaSection = schema.sections[pageIndex];
  const answerSection = instanceDraft.sections.find(
    (candidate) => candidate.sectionId === schemaSection._id,
  );
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === schema.sections.length - 1;

  return (
    <PageContainer>
      <TitleCard
        title={instance.schemaId.title}
        description={instance.schemaId.description ?? ""}
        isHeader={true}
      />
      <TitleCard
        title={schemaSection.title}
        description={schemaSection.description ?? ""}
        isHeader={false}
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
              error={errorQuestionIds.includes(question._id)}
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
        onSubmit={handleSubmit}
        submitIsPending={submitIsPending}
      />
    </PageContainer>
  );
};

export default InstanceEditPage;
