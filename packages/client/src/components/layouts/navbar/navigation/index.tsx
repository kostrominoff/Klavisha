import Api from "@/services";
import { UserResponse } from "@/types/responses/user.response";
import { roleValidator } from "@/utils/role.validator";
import { GuardRoles } from "@klavisha/types";
import Link from "next/link";
import LinkItem from "./link";
import Sublinks from "./sublinks";

export type Link = {
  label: string;
  link: string;
  roles?: GuardRoles[];
};

export type LinkWithSublinks = {
  sublinks?: Link[];
} & Link;

const links: LinkWithSublinks[] = [
  {
    label: "Главная",
    link: "/",
  },
  {
    label: "Учебные заведения",
    link: "/institutions",
    sublinks: [
      {
        link: "/institutions/create",
        label: "Создать",
        roles: [GuardRoles.ADMIN],
      },
    ],
  },
];

const validateLink = (link: Link, user: UserResponse) => {
  return link.roles ? roleValidator(link.roles, user) : true;
};

const Navigation = async () => {
  const user = await Api.auth.getMe();

  const navigationLinks = links.filter((link) => {
    if (!validateLink(link, user)) return false;

    const filteredSublinks = link.sublinks?.filter((sublink) =>
      validateLink(sublink, user)
    );

    link.sublinks = filteredSublinks;

    return true;
  });

  return (
    <nav>
      <ul>
        {navigationLinks.map((link, index) => (
          <>
            {link.sublinks ? (
              <Sublinks link={link} />
            ) : (
              <LinkItem key={index} link={link} single />
            )}
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;