import { useQuery } from "@tanstack/react-query";
import { fetchAllGroups } from "../queryFunctions/groups";

export const useFetchAllGroups = () => useQuery({
  queryKey: ["allGroups"],
  queryFn: fetchAllGroups,
  retry: 2,
  staleTime: 5 * 60_000
})