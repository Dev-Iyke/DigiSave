import { GeneralFetchingParams, Group } from "@/interfaces/groups";
import { axiosInstance } from ".."

// export const fetchAllGroups = async (params: GeneralFetchingParams): Promise<Group> => {
//   const {groupId} = params
//   const filterParams = new URLSearchParams({})
//   if(groupId) filterParams.append('groupId', groupId)
//   const response = await axiosInstance.get(`/groups?${filterParams.toString()}`)
//   return response.data.data;
// }

export const fetchAllGroups = async (): Promise<Group[] | []> => {
  const response = await axiosInstance.get(`/groups`)
  return response.data.data;
}