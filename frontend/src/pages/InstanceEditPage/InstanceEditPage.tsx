import { useParams } from "react-router-dom";
import InstanceHeader from "../../features/instance/components/InstanceHeader/InstanceHeader";
import { useGetInstance } from "../../features/instance/hooks/useInstance";

const InstanceEditPage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();

  const { instance, isPending, isError } = useGetInstance(instanceId);
  console.log("instance:", instance);

  if (isPending) return <div>טוען...</div>;
  if (isError || !instance) return <div>שגיאה בטעינת המופע</div>;

  return (
    <>
      <InstanceHeader
        title={instance.schemaId.title}
        description={instance.schemaId.description ?? ""}
      ></InstanceHeader>
    </>
  );
};

export default InstanceEditPage;
