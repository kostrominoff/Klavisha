import { UserResponse } from "@/types/responses/user.response";
import { GuardRoles, Roles } from "@klavisha/types";

export const roleValidator = (roles: GuardRoles[], user: UserResponse) =>
  roles?.some((role) => {
    switch (role) {
      case GuardRoles.STUDENT:
        return !!user.student;
      case GuardRoles.TEACHER:
        return !!user.teacher;
      case GuardRoles.INSTITUTION_ADMIN:
        return !!user.institutions;
      case GuardRoles.ADMIN:
        return user.role === Roles.ADMIN;
    }
  });
