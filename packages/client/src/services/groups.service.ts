import { GroupsFindAllResponse } from "@/types/responses/groups.reponse";
import { AxiosInstance } from "axios";

export const GroupsService = (axios: AxiosInstance) => ({
  async findAll(institutionId?: number) {
    const { data } = await axios.get<GroupsFindAllResponse>("/groups", {
      params: {
        institutionId,
      },
    });
    return data;
  },
});
