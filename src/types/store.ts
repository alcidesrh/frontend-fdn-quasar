import { Entity } from "@/models/useEntityFactory";

export interface Pagination {
  hasNextPage?: Scalars['Boolean']['output'];
  itemsPerPage?: number;
  totalCount: Scalars['Int']['output'];
  currentPage?: number;
  lastPage?: number
  
  
  getItems: (?force: boolean) => void;
  schema: Ref<Array<Records<any>>>;
  remove: (?arg: boolean) => void;
  removeMultiple: (items: Ref<[any]> | any) => void;
  resource: (variables: any) => void;
  entity: Ref<Entity>;
  iniCollection: () => Promise
  sortCollection:(d: string) => void;
  submit: () => void;
  getCollection,
  items,
  setFormkitSchema,


}
