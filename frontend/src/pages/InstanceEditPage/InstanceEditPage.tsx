import { useParams } from "react-router-dom";
import InstanceHeader from "../../features/instance/components/InstanceHeader/InstanceHeader";
import { useGetInstance } from "../../features/instance/hooks/useInstance";
import { useInstanceDraft } from "../../features/instance/hooks/useInstanceDraft";
import TextQuestion from "../../features/instance/components/TextAnswer/TextAnswer";

const InstanceEditPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();

  const { instance, isPending, isError } = useGetInstance(instanceId);
  const schema = instance?.schemaId;
  const { instanceDraft } = useInstanceDraft(instance);

  console.log("instance:", instance);

  if (isPending || !instanceDraft) return <div>טוען...</div>;
  if (isError || !instance) return <div>שגיאה בטעינת המופע</div>;

  return (
    <>
      <InstanceHeader
        title={instance.schemaId.title}
        description={instance.schemaId.description ?? ""}
      />
      <TextQuestion isParagraph={true} textInput="lol"/>

      {instanceDraft.sections.map((section, index) => {
        return <div></div>;
      })}
    </>
  );
};

export default InstanceEditPage;
