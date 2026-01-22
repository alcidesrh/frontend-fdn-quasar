import type { Collection } from "./collection";
import type { Field as CustomField } from "@/graphql/parse/src";

interface base {
  id: string;
  _id: number;
}

export interface EntityInterface {
  name: string;
  camelCase: string;
  plural: string;
  fields: [{}];
  collection: Collection;
  item: Type & base;
  payload: object;
  input: object;
  excludeFormFields: string[];
  endpoints: Record<
    "get" | "create" | "update" | "delete" | "form" | "crud" | "collection",
    string
  >;
}
