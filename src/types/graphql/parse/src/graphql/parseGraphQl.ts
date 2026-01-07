import type { Mutation } from './Mutation.js';
import type { Query } from './Query.js';
import type { Resource } from './Resource.js';
import { getIntrospectionQuery } from 'graphql/utilities/index.js';
import fetchQuery from './fetchQuery.js';

function removeEmptyObjectsByKeys(
	object: any,
	excludeValues: string[] = ['_id', '__typename', 'description', 'interfaces'],
): {} {
	if (Array.isArray(object)) {
		return;
	}
	const newObject = {};
	Object.keys(object).forEach((key) => {
		if (object[key] && !excludeValues.includes(key)) {
			if (Array.isArray(object[key])) {
				const temp: {}[] = [];
				object[key].forEach((v) => temp.push(removeEmptyObjectsByKeys(v)));
				newObject[key] = temp;
			} else if (typeof object[key] === 'object') {
				newObject[key] = removeEmptyObjectsByKeys(object[key]);
			} else {
				newObject[key] = object[key];
			}
		}
	});
	return newObject;
}
function setOptions(query: string, options: RequestInit): RequestInit {
	if (!options.method) {
		options.method = 'POST';
	}

	if (!(options.headers instanceof Headers)) {
		options.headers = new Headers(options.headers);
	}

	if (options.headers.get('Content-Type') === null) {
		options.headers.set('Content-Type', 'application/json');
	}

	if (options.method !== 'GET' && !options.body) {
		options.body = JSON.stringify({ query });
	}

	return options;
}

export default async (
	entrypointUrl: string,
	options: RequestInit = {},
): Promise<{
	resources: Resource[];
	queries: Query[];
	mutations: Mutation[];
	payload: any[];
	input: any[];
	// api: Api;
	// response: Response;
}> => {
	const introspectionQuery = getIntrospectionQuery();
	// options.headers = {
	// 	authorization:
	// 		'Bearer fdn_be1f5822c20326f313c39af741846b1d4644076d2010ac6d56aa6be9e5f76294',
	// };
	let schema;

	options = setOptions(introspectionQuery, options);
	await useApiRest<T>(entrypointUrl, {
		...options,
		onResponse({
			response: {
				_data: {
					data: { __schema },
				},
			},
		}) {
			schema = __schema;
		},
	});
	if (!schema) {
		throw new Error(
			'Schema has not been retrieved from the introspection query.',
		);
	}
	const resources: Resource[] = [];
	const queries: Query[] = [];
	const mutations: Mutation[] = [];
	const input: any = [];
	const payload: any = [];

	schema.types.forEach((typeResource) => {
		if (
			(typeResource.kind === 'OBJECT' ||
				typeResource.kind === 'INPUT_OBJECT') &&
			// type.name !== schema.queryType.name &&
			// type.name !== schema.mutationType?.name &&
			typeResource.name !== schema.subscriptionType?.name &&
			!typeResource.name.startsWith('__')
			// mutation
			// !typeResource.name.startsWith(typeResource.name[0].toLowerCase())
			// !typeResource.name.endsWith('Connection') &&
			// !typeResource.name.endsWith('Edge') &&
			// !typeResource.name.endsWith('PageInfo') &&
			// !typeResource.name.endsWith('PaginationInfo')
		) {
			if (typeResource.name.endsWith('Payload')) {
				payload[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
			} else if (typeResource.kind === 'INPUT_OBJECT') {
				input[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
			} else if (typeResource.name == schema.queryType.name) {
				typeResource.fields.forEach((v) => {
					queries[v.name] = removeEmptyObjectsByKeys(v);
				});
			} else if (typeResource.name == schema.mutationType?.name) {
				typeResource.fields.forEach((v) => {
					mutations[v.name] = removeEmptyObjectsByKeys(v);
				});
			} else {
				resources[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
			}
		}
	});
	return {
		resources,
		queries,
		mutations,
		payload,
		input,
	};

	return;
	// const {
	// 	response,
	// 	body: { data }
	// } = await fetchQuery<IntrospectionQuery>(
	// 	entrypointUrl,
	// 	introspectionQuery,
	// 	options
	// );
	// if (!data?.__schema) {
	// 	throw new Error(
	// 		'Schema has not been retrieved from the introspection query.'
	// 	);
	// }
	// const schema = data?.__schema;
	// const resources: Resource[] = [];
	// const queries: Query[] = [];
	// const mutations: Mutation[] = [];
	// const input: any = [];
	// const payload: any = [];

	// schema.types.forEach((typeResource) => {
	// 	if (
	// 		(typeResource.kind === 'OBJECT' ||
	// 			typeResource.kind === 'INPUT_OBJECT') &&
	// 		// type.name !== schema.queryType.name &&
	// 		// type.name !== schema.mutationType?.name &&
	// 		typeResource.name !== schema.subscriptionType?.name &&
	// 		!typeResource.name.startsWith('__')
	// 		// mutation
	// 		// !typeResource.name.startsWith(typeResource.name[0].toLowerCase())
	// 		// !typeResource.name.endsWith('Connection') &&
	// 		// !typeResource.name.endsWith('Edge') &&
	// 		// !typeResource.name.endsWith('PageInfo') &&
	// 		// !typeResource.name.endsWith('PaginationInfo')
	// 	) {
	// 		if (typeResource.name.endsWith('Payload')) {
	// 			payload[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
	// 		} else if (typeResource.kind === 'INPUT_OBJECT') {
	// 			input[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
	// 		} else if (typeResource.name == schema.queryType.name) {
	// 			typeResource.fields.forEach((v) => {
	// 				queries[v.name] = removeEmptyObjectsByKeys(v);
	// 			});
	// 		} else if (typeResource.name == schema.mutationType?.name) {
	// 			typeResource.fields.forEach((v) => {
	// 				mutations[v.name] = removeEmptyObjectsByKeys(v);
	// 			});
	// 		} else {
	// 			resources[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
	// 		}
	// 	}
	// });
	// return {
	// 	resources,
	// 	queries,
	// 	mutations,
	// 	payload,
	// 	input
	// };
	// // return {
	// //     api: new Api(entrypointUrl, { resources }),
	// //     response
	// // };
};
