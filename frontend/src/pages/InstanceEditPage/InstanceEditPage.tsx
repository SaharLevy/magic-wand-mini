import { useParams } from "react-router-dom";
import InstanceHeader from "../../features/instance/components/InstanceHeader/InstanceHeader";
import { useGetInstance } from "../../features/instance/hooks/useInstance";
import { useInstanceDraft } from "../../features/instance/hooks/useInstanceDraft";
import BaseAnswer from "../../features/instance/components/BaseAnswer/BaseAnswer";

const InstanceEditPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();

  const { instance, isPending, isError } = useGetInstance(instanceId);
  const { instanceDraft, updateAnswer } = useInstanceDraft(instance);

  console.log("instance:", instance);

  if (isPending || !instanceDraft) return <div>טוען...</div>;
  if (isError || !instance) return <div>שגיאה בטעינת המופע</div>;

  const schema = instance.schemaId;

  return (
    <>
      <InstanceHeader
        title={instance.schemaId.title}
        description={instance.schemaId.description ?? ""}
      />
      {schema.sections.map((schemaSection) => {
        const answerSection = instanceDraft.sections.find(
          (answerSection) => answerSection.sectionId === schemaSection._id,
        );
        if (!answerSection) return null;

        return schemaSection.questions.map((question) => {
          const answer = answerSection.answers.find(
            (answer) => answer.questionId === question._id,
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
        });
      })}
    </>
  );
};

export default InstanceEditPage;
