import { useQuery } from "@tanstack/react-query";
import type { IInstance } from "../instanceTypes";
import { getInstance } from "../instance.api";
import { TEMP_USER_ID } from "../../schema/hooks/useSchema";

export const useGetInstances = () => {
  const { data, isPending, isError } = useQuery<IInstance[]>({
    queryKey: ["instances", TEMP_USER_ID],
    queryFn: () => getInstance(TEMP_USER_ID),
  });

  return {
    instances: data,
    isPending,
    isError,
  };
};
