import { Institution } from "@klavisha/types";
import { AxiosInstance } from "axios";

export const InstitutionsService = (axios: AxiosInstance) => ({
  async findAll(name?: string) {
    const { data } = await axios.get<{ institutions: Institution[] }>(
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
