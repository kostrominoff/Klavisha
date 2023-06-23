import { AxiosInstance } from "axios";
import { ILoginUserDto, IRegisterUserDto } from "@klavisha/types";
import { UserResponse } from "@/types/responses/user.response";

export const AuthService = (axios: AxiosInstance) => ({
  async getMe() {
    const { data } = await axios.get<UserResponse>("/auth/me");
    return data;
  },
  async login(dto: ILoginUserDto) {
    return await axios.post("/auth/login", dto);
  },
  async register(dto: IRegisterUserDto) {
    return await axios.post("/auth/register", dto);
  },
});
