import { Institution, Student, UserWithoutPassword } from "@klavisha/types";

export type UserResponse = {
  institutions: Institution[];
  student: Student | null;
  teacher: {
    id: number;
  } | null;
} & UserWithoutPassword;
