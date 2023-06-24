import Typography from "@/components/ui/typography";
import { baseURL } from "@/services";
import { Institution } from "@klavisha/types";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Props = {
  institution: Institution;
};

const InstitutionScreen = ({ institution }: Props) => {
  return (
    <section>
      <div className="mx-auto max-w-3xl prose prose-slate">
        {institution.photo && (
          <Image
            className="w-full"
            src={`${baseURL}/uploads/${institution.photo}`}
            alt={institution.name}
            width={1920}
            height={1080}
          />
        )}
        <h1 className="mb-2">{institution.name}</h1>
        <Typography
          tag="span"
          variant="text1"
          className="block mt-2 font-semibold"
        >
          Город: {institution.city}
        </Typography>
        {institution.phone && (
          <Link href={`tel:${institution.phone}`}>
            <Typography
              tag="span"
              variant="text1"
              className="block mt-2 font-semibold"
            >
              Телефон: {institution.phone}
            </Typography>
          </Link>
        )}
        {institution.website && (
          <Link href={institution.website}>
            <Typography
              tag="span"
              variant="text1"
              className="block mt-2 font-semibold"
            >
              Сайт: {institution.website}
            </Typography>
          </Link>
        )}
        {institution.description && (
          <ReactMarkdown>{institution.description}</ReactMarkdown>
        )}
      </div>
    </section>
  );
};

export default InstitutionScreen;
