import { Group } from "@klavisha/types";
import { Pagination } from "../pagination";

export type GroupsFindAllResponse = Pagination<{ groups: Group[] }>;
