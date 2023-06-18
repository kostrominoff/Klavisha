import Api from "@/services";
import { notFound } from "next/navigation";

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

const InstitutionPage = async ({ params }: Props) => {
  if (isNaN(Number(params.id))) return notFound();

  const institution = await Api.institutions.findOne(+params.id);

  return <div>{institution.name}</div>;
};

export default InstitutionPage;
