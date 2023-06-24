import UpdateInstitutionsScreen from "@/components/screens/institutions/actions/update";
import Api from "@/services";
import { notFound } from "next/navigation";
import React from "react";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export const generateMetadata = async ({ params }: Props) => {
  const institution = await Api.institutions.findOne(+params.id);
  return {
    title: institution.name,
  };
};

const UpdateInstitutionPage = async ({ params }: Props) => {
  if (isNaN(Number(params.id))) return notFound();
  const institution = await Api.institutions.findOne(+params.id);

  const user = await Api.auth.getMe();
  if (!user.institutions.some(({ id }) => id === institution.id))
    return notFound();

  return <UpdateInstitutionsScreen institution={institution} />;
};

export default UpdateInstitutionPage;
