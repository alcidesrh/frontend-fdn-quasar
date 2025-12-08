import type { Collection } from './collection';

interface base {
	id: string;
	_id: number;
}

export type EntityInterface {
	name: string;
	camelCase: string;
	plural: string;
	fields: [{}];
	columns: [{}];
	collection: Ref<Collection>;
	item: Type & base;
	payload: object;
	input: object;
	excludeFormFields: string[];
	endpoints: Record<
		'get' | 'create' | 'update' | 'delete' | 'form' | 'crud' | 'collection',
		string
	>;
}
