import Api from "@/services";
import { Institution, Roles } from "@klavisha/types";
import Link from "next/link";
import DeleteInstitution from "./delete";
import { ButtonStyles } from "@/components/ui/button/styles";
import clsx from "clsx";

type Props = {
  institution: Institution;
};

const InstitutionControls = async ({ institution }: Props) => {
  try {
    const user = await Api.auth.getMe();

    if (
      user.role !== Roles.ADMIN ||
      !user.institutions.some(({ id }) => id === institution.id)
    ) {
      return null;
    }

    return (
      <section className="flex gap-3 py-5 mx-auto max-w-3xl">
        <Link
          className={clsx(
            ButtonStyles("primary"),
            "flex justify-center items-center py-[10px] px-4"
          )}
          href={`/institutions/${institution.id}/update`}
        >
          Изменить
        </Link>
        <DeleteInstitution institutionId={institution.id} />
      </section>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default InstitutionControls;
