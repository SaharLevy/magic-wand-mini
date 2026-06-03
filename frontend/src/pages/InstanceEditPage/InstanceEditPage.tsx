import { useParams } from "react-router-dom";

const InstanceEditPage = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
};
