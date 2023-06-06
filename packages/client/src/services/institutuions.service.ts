import { InstitutionsFindAllResponse } from "@/types/responses/institutions.response";
import { AxiosInstance } from "axios";

export const InstitutionsService = (axios: AxiosInstance) => ({
  async findAll(name?: string) {
    const { data } = await axios.get<InstitutionsFindAllResponse>(
      "/institutions",
      {
        params: {
          name,
        },
      }
    );
    return data;
  },
});
