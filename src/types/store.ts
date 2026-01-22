import { Entity } from "@/models/useEntityFactory";
import { SelectOption } from "./fdn";
import { PaginationQuasar } from "./collection";

export interface Store {
  getItems: (force: boolean) => void;
  schema: Ref<Array<Records<any>>>;
  remove: (arg: boolean) => void;
  removeMultiple: (items: Ref<[any]> | any) => void;
  resource: (variables: any) => void;
  entity: EntityInterface;
  iniCollection: () => Promise;
  sortCollection: (d: string) => void;
  submit: () => void;
  getCollection: (fetchPolicy: string) => void;
  items: Ref<Array<SelectOption> | []>;
  setPagination: (p: PaginationQuasar) => void;
  setFormkitSchema: (id?: string) => void;
}
