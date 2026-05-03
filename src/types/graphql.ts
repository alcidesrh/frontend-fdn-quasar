export interface Column {
	id: string
	field: string
	position: number
	visible: boolean
	sortable: boolean
	filterable: boolean
	label: string
	attrs: null
	name: string
	schema: Schema
}

export interface Schema {
	$formkit: string
	name: string
	id: string
	loading: string
	outerClass: string
	dense: boolean
	multiple: boolean
	options: Option[]
}

export interface Option {
	id: string
	label: string
}

export interface OfType {
	kind: string
	name: string
	ofType: OfType | null
}

export interface Type {
	kind: string
	name: null | string
	ofType: OfType | null
}
// export interface Entity {
//   formExclude: [string];
//   label: [string];
//   groups: [Record<"children", string | number | [] | {}>];
//   classes: Record<string, string>;
//   getForm: (string) => [];
//   getOptions: () => [];
//   getQueryFields: () => [];
// }

export interface Collection {
	name: string
	args: Variables
	type: string
	fields: [Record<'collection', [string]> | Record<string, [any]>]
}

export interface Variables {
	currentPage: string
	itemsPerPage: string
	createdAt: string
}
export interface Args {
	type: string
	value?: any
}

export interface Field {
	name: string
	input: FormkitInput
	type: string
	relatedTo: string
}

export interface FormkitInput {
	required?: boolean
	$formkit: string
	multiple?: boolean
}

export interface Mutations {
	create: Create
	update: Update
	delete: Delete
}

export interface Delete {
	name: string
	args: Args
}

export interface Update {
	name: string
	args: Args
}

export interface Create {
	name: string
	args: Args
}

export interface Queries {
	collection: Collection
	item: Item
}

export interface Item {
	name: string
	args: Args
	type: string
}
export interface CollectionFieldConfig {
	id: string
	field: string
	position: number
	visible: boolean
	sortable: boolean
	filterable: boolean
	label: string
	attrs?: any
	name: string
	__typename: string
}
interface Input {
	id: number
	label: string
	name: string
	multiple: boolean
	options: Array<Record<'label' | 'value', string>>
	$formkit: string
}
export interface FormFields {
	field: string
	position: number
	visible: boolean
	groupName?: any
	input: Input
}

export interface EntityConfig {
	entityClass: string
	collectionFieldConfig: CollectionFieldConfig[]
	formFields: FormFields[]
}
export interface Entity {
	name: string
	fields: Record<string, Field>
	queries: Queries
	mutations: Mutations
	pagination: boolean
}

export interface EntityStore {
	entity: Entity
	config: EntityConfig
	name: string
	nameDecapitalize: string
	items: []
	item: {}
	options: []
	fields: Field[]
	filters: {}
	excludeFields: []
	labels: {}
	columns: Array<Column>
	visibleColumns: Array<string>
	computedColumns: Array<Column>
	orderField?: string
	orderType?: string
	formSchema: Array<Input>
	formData: []
	formGroups: {}
	pagination: {
		itemsPerPage?: number
		lastPage?: number
		totalCount?: number
		currentPage?: number
		hasNextPage?: boolean
	}
	collection: () => void
	resetColumns: () => void
	getItem: () => void
	getFormData: () => void
	remove: () => void
	removeMultiple: () => void
	getOptions: () => void
	orderColumns: () => void
	submit: () => void
}

export interface SchemaStore {
	entities: Record<string, Entity>
	mutations: Entity[]
	queries: Entity[]
	payloads: any
}
