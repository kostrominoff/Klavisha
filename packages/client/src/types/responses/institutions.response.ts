import { Institution } from "@klavisha/types";
import { Pagination } from "../pagination";

export type InstitutionsResponse = Pick<
  Institution,
  "id" | "name" | "photo" | "city"
>[];

export type InstitutionsFindAllResponse = Pagination<{
  institutions: InstitutionsResponse;
}>;
