import { PaginationParams } from "@/types/pagination";
import {
  InstitutionFindOneResponse,
  InstitutionsFindAllResponse,
} from "@/types/responses/institutions.response";
import { ICreateInstitutionDto } from "@klavisha/types";
import { AxiosInstance } from "axios";

export const InstitutionsService = (axios: AxiosInstance) => ({
  async findAll(name?: string, pagination?: PaginationParams) {
    const { data } = await axios.get<InstitutionsFindAllResponse>(
      "/institutions",
      {
        params: {
          name,
          ...pagination,
        },
      }
    );
    return data;
  },
  async create(dto: ICreateInstitutionDto) {
    return await axios.post("/institutions", dto);
  },
  async findOne(id: number) {
    const { data } = await axios.get<InstitutionFindOneResponse>(
      `/institutions/${id}`
    );
    return data;
  },
  async delete(id: number) {
    return await axios.delete(`/institutions/${id}`);
  },
});
