import Api, { baseURL } from "@/services";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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

  return (
    <div className="prose prose-slate">
      {institution.photo && (
        <Image
          src={`${baseURL}/uploads/${institution.photo}`}
          alt={institution.name}
          width={600}
          height={300}
        />
      )}
      <h1>{institution.name}</h1>
      {institution.description && (
        <ReactMarkdown>{institution.description}</ReactMarkdown>
      )}
    </div>
  );
};

export default InstitutionPage;
