import {
  Group,
  Institution,
  Student,
  UserWithoutPassword,
} from "@klavisha/types";

export type UserResponse = {
  institutions: Institution[];
  student: Student | null;
  teacher: {
    id: number;
  } | null;
} & UserWithoutPassword;

export type UsersResponse = {
  student:
    | (Pick<Student, "id" | "subgroup"> & {
        group: Pick<Group, "id" | "name">;
      })
    | null;
  teacher: {
    id: number;
    Institution: {
      id: number;
    };
  } | null;
  institutions: Institution[];
} & Omit<UserWithoutPassword, "createdAt" | "updatedAt">;
