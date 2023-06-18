import { baseURL } from "@/services";
import { InstitutionResponse } from "@/types/responses/institutions.response";
import Image from "next/image";
import Typography from "../../typography";
import Link from "next/link";

type Props = {
  institution: InstitutionResponse;
};

const InstitutionCard = ({ institution }: Props) => {
  return (
    <li>
      <Link href={`/institutions/${institution.id}`}>
        {institution.photo && (
          <Image
            src={`${baseURL}/uploads/${institution.photo}`}
            alt={`Фотография ${institution.name}`}
            width={200}
            height={200}
          />
        )}
        <Typography tag="h3" variant="h3">
          {institution.name}
        </Typography>
        <Typography tag="h4" variant="h4">
          {institution.city}
        </Typography>
        <Typography className="hover:underline" tag="span" variant="text1">
          Подробнее
        </Typography>
      </Link>
    </li>
  );
};

export default InstitutionCard;
