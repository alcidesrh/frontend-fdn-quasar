import type { View } from "./view";
import type { Maybe, Scalars, UserFilter_Order } from '@/types/graphql/graphql';

export interface PagedCollection<T> {
  "@context"?: string;
  "@id"?: string;
  "@type"?: string;
  member: T[];
  search?: object;
  totalItems?: number;
  view: View;
}

export interface Pagination {
	hasNextPage?: Scalars['Boolean']['output'];
	itemsPerPage?: number;
	totalCount: Scalars['Int']['output'];
	currentPage?: number;
  lastPage?: number
}

export interface Column {
	name: string;
	label: string;
	sort: string;
	filter: boolean;
	schema: Record<string, string>;
	style: string;
}

export interface CollectionVars {
	order?: [UserFilter_Order];
	itemsPerPage: Scalars['Int']['output'];
	page: number;
}

export interface Collection {
	menu: string;
	columns: [Column] | [];
	items: Maybe<Array<Maybe<{}>>>;
	pagination: Ref<Pagination>;
	filters: any;
	args: computed<Record>(() => {});
	orderField: string;
	orderType: string;
	loading: boolean;
	hasFilter: boolean;
}

