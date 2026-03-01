export interface Entity {
  name: string;
  kind: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type: Type;
}

export interface Type {
  kind: string;
  name: any;
  ofType: OfType;
}

export interface OfType {
  kind: string;
  name: string;
}

export interface EntityStore {
  name: string;
  items: [];
  fields: Field[];
  pagination: {
    itemsPerPage?: number;
    lastPage?: number;
    totalCount?: number;
    currentPage?: number;
    hasNextPage?: boolean;
  };
  orderField?: string;
  orderType?: string;
  filters: {};
  visibleColumns: [];
  columns: [];
  computedColumns: [];
}

export interface SchemaStore {
  entities: Array<Record<string, Entity>>;
  mutations: Entity[];
  queries: Entity[];
}
