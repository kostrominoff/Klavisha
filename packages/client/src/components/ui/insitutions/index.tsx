import Api from "@/services";
import InstitutionCard from "./card";

const Institutions = async () => {
  const { institutions, count, pages } = await Api.institutions.findAll();

  return (
    <ul>
      {institutions.map((institution) => (
        <InstitutionCard institution={institution} key={institution.id} />
      ))}
    </ul>
  );
};

export default Institutions;
