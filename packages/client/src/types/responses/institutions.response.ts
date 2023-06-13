import { Institution } from "@klavisha/types";
import { Pagination } from "../pagination";

export type InstitutionResponse = Pick<
  Institution,
  "id" | "name" | "photo" | "city"
>;

export type InstitutionsResponse = InstitutionResponse[];

export type InstitutionsFindAllResponse = Pagination<{
  institutions: InstitutionsResponse;
}>;
