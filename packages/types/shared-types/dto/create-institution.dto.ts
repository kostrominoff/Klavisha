import { Institution } from "../institution.type";

export interface ICreateInstitutionDto
  extends Omit<Institution, "id" | "createdAt" | "updatedAt"> {
  owners: number[];
}
