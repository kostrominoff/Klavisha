import { AxiosInstance } from "axios";
import { ILoginUserDto, IRegisterUserDto, User } from "@klavisha/types";

export const AuthService = (axios: AxiosInstance) => ({
  async getMe() {
    const { data } = await axios.get<User>("/auth/me");
    return data;
  },
  async login(dto: ILoginUserDto) {
    return await axios.post("/auth/login", dto);
  },
  async register(dto: IRegisterUserDto) {
    return await axios.post("/auth/register", dto);
  },
});
