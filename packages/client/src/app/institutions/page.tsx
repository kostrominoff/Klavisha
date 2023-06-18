import Institutions from "@/components/ui/insitutions";
import { notFound } from "next/navigation";

export type SearchParams = {
  limit?: string;
  page?: string;
  name?: string;
};

type Props = {
  searchParams: SearchParams;
};

const InstitutionsPage = ({ searchParams }: Props) => {
  if (
    (searchParams.limit && isNaN(Number(searchParams.limit))) ||
    (searchParams.page && isNaN(Number(searchParams.page)))
  )
    return notFound();

  return (
    <div>
      <Institutions searchParams={searchParams} />
    </div>
  );
};

export default InstitutionsPage;
