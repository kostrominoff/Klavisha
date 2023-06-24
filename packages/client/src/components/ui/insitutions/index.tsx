import Api from "@/services";
import InstitutionCard from "./card";
import { SearchParams } from "@/app/institutions/page";

type Props = {
  searchParams: SearchParams;
};

// TODO: pagination and filter
// Add styles
const Institutions = async ({ searchParams }: Props) => {
  const { institutions, count, pages } = await Api.institutions.findAll(
    searchParams?.name || "",
    {
      page: Number(searchParams?.page) || 1,
      limit: Number(searchParams?.limit) || 10,
    }
  );

  return (
    <section>
      <ul className="flex flex-wrap gap-3 justify-center">
        {institutions.map((institution) => (
          <InstitutionCard institution={institution} key={institution.id} />
        ))}
      </ul>
    </section>
  );
};

export default Institutions;
