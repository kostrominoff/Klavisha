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
    <li className="w-full max-w-xs rounded-lg border-2 border-slate-300 overflow-clip">
      <Link href={`/institutions/${institution.id}`}>
        {institution.photo ? (
          <Image
            className="w-full h-[180px]"
            src={`${baseURL}/uploads/${institution.photo}`}
            alt={`Фотография ${institution.name}`}
            width={320}
            height={180}
          />
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-[180px] bg-slate-200">
            <Typography
              tag="span"
              variant="text1"
              className="text-slate-600"
              customColor
            >
              Нет фото!
            </Typography>
          </div>
        )}
        <div className="flex flex-col gap-2 p-2">
          <Typography tag="h3" variant="h3">
            {institution.name}
          </Typography>
          <Typography tag="h4" variant="h5">
            {institution.city}
          </Typography>
          <Typography className="hover:underline" tag="span" variant="text1">
            Подробнее
          </Typography>
        </div>
      </Link>
    </li>
  );
};

export default InstitutionCard;
