import { useParams } from "react-router-dom";
import InstanceHeader from "../../features/instance/components/InstanceHeader/InstanceHeader";
import { useState } from "react";

const InstanceEditPage = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const [title, setTitle] = useState("try");
  const [description, setDescription] = useState("try");

  return (
    <>
      <InstanceHeader title={title} description={description}></InstanceHeader>
    </>
  );
};

export default InstanceEditPage;
