import { Pagination, PaginationParams } from "@/types/pagination";
import { UsersResponse } from "@/types/responses/user.response";
import { ICreateUserDto } from "@klavisha/types";
import { AxiosInstance } from "axios";

type SearchParams = {
  name?: string;
  email?: string;
};

export const UsersService = (axios: AxiosInstance) => ({
  async findAll(params?: SearchParams, pagination?: PaginationParams) {
    const { data } = await axios.get<Pagination<{ users: UsersResponse[] }>>(
      "/users",
      {
        params: {
          ...params,
          ...pagination,
        },
      }
    );
    return data;
  },
  async create(dto: ICreateUserDto) {
    return await axios.post("/users", dto);
  },
});
