import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { gql } from 'graphql-tag';

/* tslint:disable */
/* eslint-disable */

const VariableName = ' $1fcbcbff-3e78-462f-b45c-668a3e09bfd8';

const ScalarBrandingField = ' $1fcbcbff-3e78-462f-b45c-668a3e09bfd9';

type CustomScalar<T> = { [ScalarBrandingField]: T };

class Variable<T, Name extends string> {
	private [VariableName]: Name;
	// @ts-ignore
	private _type?: T;

	// @ts-ignore
	constructor(name: Name, private readonly isRequired?: boolean) {
		this[VariableName] = name;
	}
}

type ArrayInput<I> = [I] extends [$Atomic]
	? never
	: ReadonlyArray<VariabledInput<I>>;

type AllowedInlineScalars<S> = S extends string | number ? S : never;

export type UnwrapCustomScalars<T> = T extends CustomScalar<infer S>
	? S
	: T extends ReadonlyArray<infer I>
	? ReadonlyArray<UnwrapCustomScalars<I>>
	: T extends Record<string, any>
	? { [K in keyof T]: UnwrapCustomScalars<T[K]> }
	: T;

type VariableWithoutScalars<T, Str extends string> = Variable<
	UnwrapCustomScalars<T>,
	Str
>;

// the array wrapper prevents distributive conditional types
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type VariabledInput<T> = [T] extends [CustomScalar<infer S> | null | undefined]
	? // scalars only support variable input
	  | Variable<S | null | undefined, any>
			| AllowedInlineScalars<S>
			| null
			| undefined
	: [T] extends [CustomScalar<infer S>]
	? Variable<S, any> | AllowedInlineScalars<S>
	: [T] extends [$Atomic]
	? Variable<T, any> | T
	: T extends ReadonlyArray<infer I>
	? VariableWithoutScalars<T, any> | T | ArrayInput<I>
	: T extends Record<string, any> | null | undefined
	?
			| VariableWithoutScalars<T | null | undefined, any>
			| null
			| undefined
			| { [K in keyof T]: VariabledInput<T[K]> }
			| T
	: T extends Record<string, any>
	?
			| VariableWithoutScalars<T, any>
			| { [K in keyof T]: VariabledInput<T[K]> }
			| T
	: never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I,
) => void
	? I
	: never;

/**
 * Creates a new query variable
 *
 * @param name The variable name
 */
export const $ = <Type, Name extends string>(
	name: Name,
): Variable<Type, Name> => {
	return new Variable(name);
};

/**
 * Creates a new query variable. A value will be required even if the input is optional
 *
 * @param name The variable name
 */
export const $$ = <Type, Name extends string>(
	name: Name,
): Variable<NonNullable<Type>, Name> => {
	return new Variable(name, true);
};

type SelectOptions = {
	argTypes?: { [key: string]: string };
	args?: { [key: string]: any };
	selection?: Selection<any>;
};

class $Field<Name extends string, Type, Vars = {}> {
	public kind: 'field' = 'field';
	public type!: Type;

	public vars!: Vars;
	public alias: string | null = null;

	constructor(public name: Name, public options: SelectOptions) {}

	as<Rename extends string>(alias: Rename): $Field<Rename, Type, Vars> {
		const f = new $Field(this.name, this.options);
		f.alias = alias;
		return f as any;
	}
}

class $Base<Name extends string> {
	// @ts-ignore
	constructor(private $$name: Name) {}

	protected $_select<Key extends string>(
		name: Key,
		options: SelectOptions = {},
	): $Field<Key, any, any> {
		return new $Field(name, options);
	}
}

// @ts-ignore
class $Union<T, Name extends String> extends $Base<Name> {
	// @ts-ignore
	private $$type!: T;
	// @ts-ignore
	private $$name!: Name;

	constructor(
		private selectorClasses: { [K in keyof T]: { new (): T[K] } },
		$$name: Name,
	) {
		super($$name);
	}

	$on<Type extends keyof T, Sel extends Selection<T[Type]>>(
		alternative: Type,
		selectorFn: (selector: T[Type]) => [...Sel],
	): $UnionSelection<GetOutput<Sel>, GetVariables<Sel>> {
		const selection = selectorFn(new this.selectorClasses[alternative]());

		return new $UnionSelection(alternative as string, selection);
	}
}

// @ts-ignore
class $Interface<T, Name extends string> extends $Base<Name> {
	// @ts-ignore
	private $$type!: T;
	// @ts-ignore
	private $$name!: Name;

	constructor(
		private selectorClasses: { [K in keyof T]: { new (): T[K] } },
		$$name: Name,
	) {
		super($$name);
	}
	$on<Type extends keyof T, Sel extends Selection<T[Type]>>(
		alternative: Type,
		selectorFn: (selector: T[Type]) => [...Sel],
	): $UnionSelection<GetOutput<Sel>, GetVariables<Sel>> {
		const selection = selectorFn(new this.selectorClasses[alternative]());

		return new $UnionSelection(alternative as string, selection);
	}
}

class $UnionSelection<T, Vars> {
	public kind: 'union' = 'union';
	// @ts-ignore
	private vars!: Vars;
	constructor(
		public alternativeName: string,
		public alternativeSelection: Selection<T>,
	) {}
}

type Selection<_any> = ReadonlyArray<
	$Field<any, any, any> | $UnionSelection<any, any>
>;

type NeverNever<T> = [T] extends [never] ? {} : T;

type Simplify<T> = { [K in keyof T]: T[K] } & {};

type LeafType<T> = T extends CustomScalar<infer S> ? S : T;

export type GetOutput<X extends Selection<any>> = Simplify<
	UnionToIntersection<
		{
			[I in keyof X]: X[I] extends $Field<infer Name, infer Type, any>
				? { [K in Name]: LeafType<Type> }
				: never;
		}[keyof X & number]
	> &
		NeverNever<
			{
				[I in keyof X]: X[I] extends $UnionSelection<infer Type, any>
					? LeafType<Type>
					: never;
			}[keyof X & number]
		>
>;

type PossiblyOptionalVar<VName extends string, VType> = null extends VType
	? { [key in VName]?: VType }
	: { [key in VName]: VType };

type ExtractInputVariables<Inputs> = Inputs extends Variable<
	infer VType,
	infer VName
>
	? PossiblyOptionalVar<VName, VType>
	: // Avoid generating an index signature for possibly undefined or null inputs.
	// The compiler incorrectly infers null or undefined, and we must force access the Inputs
	// type to convince the compiler its "never", while still retaining {} as the result
	// for null and undefined cases
	// Works around issue 79
	Inputs extends null | undefined
	? { [K in keyof Inputs]: Inputs[K] }
	: Inputs extends $Atomic
	? {}
	: Inputs extends any[] | readonly any[]
	? UnionToIntersection<
			{ [K in keyof Inputs]: ExtractInputVariables<Inputs[K]> }[keyof Inputs &
				number]
	  >
	: UnionToIntersection<
			{ [K in keyof Inputs]: ExtractInputVariables<Inputs[K]> }[keyof Inputs]
	  >;

export type GetVariables<
	Sel extends Selection<any>,
	ExtraVars = {},
> = UnionToIntersection<
	{
		[I in keyof Sel]: Sel[I] extends $Field<any, any, infer Vars>
			? Vars
			: Sel[I] extends $UnionSelection<any, infer Vars>
			? Vars
			: never;
	}[keyof Sel & number]
> &
	ExtractInputVariables<ExtraVars>;

type ArgVarType = {
	type: string;
	isRequired: boolean;
	array: {
		isRequired: boolean;
	} | null;
};

const arrRegex = /\[(.*?)\]/;

/**
 * Converts graphql string type to `ArgVarType`
 * @param input
 * @returns
 */
function getArgVarType(input: string): ArgVarType {
	const array = input.includes('[')
		? {
				isRequired: input.endsWith('!'),
		  }
		: null;

	const type = array ? arrRegex.exec(input)![1]! : input;
	const isRequired = type.endsWith('!');

	return {
		array,
		isRequired: isRequired,
		type: type.replace('!', ''),
	};
}

function fieldToQuery(prefix: string, field: $Field<any, any, any>) {
	const variables = new Map<
		string,
		{ variable: Variable<any, any>; type: ArgVarType }
	>();

	function stringifyArgs(
		args: any,
		argTypes: { [key: string]: string },
		argVarType?: ArgVarType,
	): string {
		switch (typeof args) {
			case 'string':
				const cleanType = argVarType!.type;
				if ($Enums.has(cleanType!)) return args;
				else return JSON.stringify(args);
			case 'number':
			case 'boolean':
				return JSON.stringify(args);
			default:
				if (args == null) return 'null';
				if (VariableName in (args as any)) {
					if (!argVarType)
						throw new globalThis.Error(
							'Cannot use variabe as sole unnamed field argument',
						);
					const variable = args as Variable<any, any>;
					const argVarName = variable[VariableName];
					variables.set(argVarName, { type: argVarType, variable: variable });
					return '$' + argVarName;
				}
				if (Array.isArray(args))
					return (
						'[' +
						args
							.map((arg) => stringifyArgs(arg, argTypes, argVarType))
							.join(',') +
						']'
					);
				const wrapped = (content: string) =>
					argVarType ? '{' + content + '}' : content;
				return wrapped(
					Array.from(Object.entries(args))
						.map(([key, val]) => {
							let argTypeForKey = argTypes[key];
							if (!argTypeForKey) {
								throw new globalThis.Error(
									`Argument type for ${key} not found`,
								);
							}
							const cleanType = argTypeForKey
								.replace('[', '')
								.replace(']', '')
								.replace(/!/g, '');
							return (
								key +
								':' +
								stringifyArgs(
									val,
									$InputTypes[cleanType]!,
									getArgVarType(argTypeForKey),
								)
							);
						})
						.join(','),
				);
		}
	}

	function extractTextAndVars(
		field: $Field<any, any, any> | $UnionSelection<any, any>,
	) {
		if (field.kind === 'field') {
			let retVal = field.name;
			if (field.alias) retVal = field.alias + ':' + retVal;
			const args = field.options.args,
				argTypes = field.options.argTypes;
			if (args && Object.keys(args).length > 0) {
				retVal += '(' + stringifyArgs(args, argTypes!) + ')';
			}
			let sel = field.options.selection;
			if (sel) {
				retVal += '{';
				for (let subField of sel) {
					retVal += extractTextAndVars(subField);
				}
				retVal += '}';
			}
			return retVal + ' ';
		} else if (field.kind === 'union') {
			let retVal = '... on ' + field.alternativeName + ' {';
			for (let subField of field.alternativeSelection) {
				retVal += extractTextAndVars(subField);
			}
			retVal += '}';

			return retVal + ' ';
		} else {
			throw new globalThis.Error('Uknown field kind');
		}
	}

	const queryRaw = extractTextAndVars(field)!;

	const queryBody = queryRaw.substring(queryRaw.indexOf('{'));

	const varList = Array.from(variables.entries());
	let ret = prefix;
	if (varList.length) {
		ret +=
			'(' +
			varList
				.map(([name, { type: kind, variable }]) => {
					let type = kind.array ? '[' : '';
					type += kind.type;
					if (kind.isRequired) type += '!';
					if (kind.array) type += kind.array.isRequired ? ']!' : ']';

					if (!type.endsWith('!') && (variable as any).isRequired === true) {
						type += '!';
					}

					return '$' + name + ':' + type;
				})
				.join(',') +
			')';
	}
	ret += queryBody;

	return ret;
}

export type OutputTypeOf<T> = T extends $Interface<infer Subtypes, any>
	? { [K in keyof Subtypes]: OutputTypeOf<Subtypes[K]> }[keyof Subtypes]
	: T extends $Union<infer Subtypes, any>
	? { [K in keyof Subtypes]: OutputTypeOf<Subtypes[K]> }[keyof Subtypes]
	: T extends $Base<any>
	? { [K in keyof T]?: OutputTypeOf<T[K]> }
	: [T] extends [$Field<any, infer FieldType, any>]
	? FieldType
	: [T] extends [(selFn: (arg: infer Inner) => any) => any]
	? OutputTypeOf<Inner>
	: [T] extends [(args: any, selFn: (arg: infer Inner) => any) => any]
	? OutputTypeOf<Inner>
	: never;

export type QueryOutputType<T extends TypedDocumentNode<any>> =
	T extends TypedDocumentNode<infer Out> ? Out : never;

export type QueryInputType<T extends TypedDocumentNode<any>> =
	T extends TypedDocumentNode<any, infer In> ? In : never;

export function fragment<T, Sel extends Selection<T>>(
	GQLType: { new (): T },
	selectFn: (selector: T) => [...Sel],
) {
	return selectFn(new GQLType());
}

type LastOf<T> = UnionToIntersection<
	T extends any ? () => T : never
> extends () => infer R
	? R
	: never;

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type TuplifyUnion<
	T,
	L = LastOf<T>,
	N = [T] extends [never] ? true : false,
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;

type AllFieldProperties<I> = {
	[K in keyof I]: I[K] extends $Field<infer Name, infer Type, any>
		? $Field<Name, Type, any>
		: never;
};

type ValueOf<T> = T[keyof T];

export type AllFields<T> = TuplifyUnion<ValueOf<AllFieldProperties<T>>>;

export function all<I extends $Base<any>>(instance: I) {
	const prototype = Object.getPrototypeOf(instance);
	const allFields = Object.getOwnPropertyNames(prototype)
		.map((k) => prototype[k])
		.filter((o) => o?.kind === 'field')
		.map((o) => o?.name) as (keyof typeof instance)[];
	return allFields.map(
		(fieldName) => instance?.[fieldName],
	) as any as AllFields<I>;
}

// We use a dummy conditional type that involves GenericType to defer the compiler's inference of
// any possible variables nested in this type. This addresses a problem where variables are
// inferred with type unknown
// @ts-ignore
type ExactArgNames<GenericType, Constraint> = GenericType extends never
	? never
	: [Constraint] extends [$Atomic | CustomScalar<any>]
	? GenericType
	: Constraint extends ReadonlyArray<infer InnerConstraint>
	? GenericType extends ReadonlyArray<infer Inner>
		? ReadonlyArray<ExactArgNames<Inner, InnerConstraint>>
		: GenericType
	: GenericType & {
			[Key in keyof GenericType]: Key extends keyof Constraint
				? ExactArgNames<GenericType[Key], Constraint[Key]>
				: never;
	  };

type $Atomic = Status | number | string | boolean | null | undefined;

let $Enums = new Set<string>(['Status']);

export class Query extends $Base<'Query'> {
	constructor() {
		super('Query');
	}

	action<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Action>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Action) => [...Sel],
	): $Field<'action', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Action()),
		};
		return this.$_select('action', options as any) as any;
	}

	actions<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<ActionFilter_order | null>> | null;
		}>,
		Sel extends Selection<ActionPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<ActionFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: ActionPageConnection) => [...Sel],
	): $Field<'actions', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	actions<Sel extends Selection<ActionPageConnection>>(
		selectorFn: (s: ActionPageConnection) => [...Sel],
	): $Field<'actions', GetOutput<Sel> | null, GetVariables<Sel>>;
	actions(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[ActionFilter_order]',
			},
			args,

			selection: selectorFn(new ActionPageConnection()),
		};
		return this.$_select('actions', options as any) as any;
	}

	agencia<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Agencia>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Agencia) => [...Sel],
	): $Field<'agencia', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Agencia()),
		};
		return this.$_select('agencia', options as any) as any;
	}

	agencias<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<AgenciaCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: AgenciaCursorConnection) => [...Sel],
	): $Field<'agencias', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	agencias<Sel extends Selection<AgenciaCursorConnection>>(
		selectorFn: (s: AgenciaCursorConnection) => [...Sel],
	): $Field<'agencias', GetOutput<Sel> | null, GetVariables<Sel>>;
	agencias(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new AgenciaCursorConnection()),
		};
		return this.$_select('agencias', options as any) as any;
	}

	agnostic<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Agnostic>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Agnostic) => [...Sel],
	): $Field<'agnostic', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Agnostic()),
		};
		return this.$_select('agnostic', options as any) as any;
	}

	asiento<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Asiento>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Asiento) => [...Sel],
	): $Field<'asiento', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Asiento()),
		};
		return this.$_select('asiento', options as any) as any;
	}

	asientos<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<AsientoCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: AsientoCursorConnection) => [...Sel],
	): $Field<'asientos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	asientos<Sel extends Selection<AsientoCursorConnection>>(
		selectorFn: (s: AsientoCursorConnection) => [...Sel],
	): $Field<'asientos', GetOutput<Sel> | null, GetVariables<Sel>>;
	asientos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new AsientoCursorConnection()),
		};
		return this.$_select('asientos', options as any) as any;
	}

	boleto<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Boleto>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Boleto) => [...Sel],
	): $Field<'boleto', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Boleto()),
		};
		return this.$_select('boleto', options as any) as any;
	}

	boletoLog<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<BoletoLog>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: BoletoLog) => [...Sel],
	): $Field<'boletoLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new BoletoLog()),
		};
		return this.$_select('boletoLog', options as any) as any;
	}

	boletoLogs<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<BoletoLogCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: BoletoLogCursorConnection) => [...Sel],
	): $Field<'boletoLogs', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	boletoLogs<Sel extends Selection<BoletoLogCursorConnection>>(
		selectorFn: (s: BoletoLogCursorConnection) => [...Sel],
	): $Field<'boletoLogs', GetOutput<Sel> | null, GetVariables<Sel>>;
	boletoLogs(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new BoletoLogCursorConnection()),
		};
		return this.$_select('boletoLogs', options as any) as any;
	}

	boletos<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<BoletoCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: BoletoCursorConnection) => [...Sel],
	): $Field<'boletos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	boletos<Sel extends Selection<BoletoCursorConnection>>(
		selectorFn: (s: BoletoCursorConnection) => [...Sel],
	): $Field<'boletos', GetOutput<Sel> | null, GetVariables<Sel>>;
	boletos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new BoletoCursorConnection()),
		};
		return this.$_select('boletos', options as any) as any;
	}

	bus<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Bus>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Bus) => [...Sel],
	): $Field<'bus', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Bus()),
		};
		return this.$_select('bus', options as any) as any;
	}

	buses<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			marca?: string | null;
			marca_list?: Readonly<Array<string | null>> | null;
			placa?: string | null;
			placa_list?: Readonly<Array<string | null>> | null;
			status?: string | null;
			status_list?: Readonly<Array<string | null>> | null;
			createdAt?: Readonly<Array<BusFilter_createdAt | null>> | null;
			order?: Readonly<Array<BusFilter_order | null>> | null;
		}>,
		Sel extends Selection<BusPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				marca?: string | null;
				marca_list?: Readonly<Array<string | null>> | null;
				placa?: string | null;
				placa_list?: Readonly<Array<string | null>> | null;
				status?: string | null;
				status_list?: Readonly<Array<string | null>> | null;
				createdAt?: Readonly<Array<BusFilter_createdAt | null>> | null;
				order?: Readonly<Array<BusFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: BusPageConnection) => [...Sel],
	): $Field<'buses', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	buses<Sel extends Selection<BusPageConnection>>(
		selectorFn: (s: BusPageConnection) => [...Sel],
	): $Field<'buses', GetOutput<Sel> | null, GetVariables<Sel>>;
	buses(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				marca: 'String',
				marca_list: '[String]',
				placa: 'String',
				placa_list: '[String]',
				status: 'String',
				status_list: '[String]',
				createdAt: '[BusFilter_createdAt]',
				order: '[BusFilter_order]',
			},
			args,

			selection: selectorFn(new BusPageConnection()),
		};
		return this.$_select('buses', options as any) as any;
	}

	cliente<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Cliente>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Cliente) => [...Sel],
	): $Field<'cliente', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Cliente()),
		};
		return this.$_select('cliente', options as any) as any;
	}

	clientes<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<ClienteCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: ClienteCursorConnection) => [...Sel],
	): $Field<'clientes', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	clientes<Sel extends Selection<ClienteCursorConnection>>(
		selectorFn: (s: ClienteCursorConnection) => [...Sel],
	): $Field<'clientes', GetOutput<Sel> | null, GetVariables<Sel>>;
	clientes(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new ClienteCursorConnection()),
		};
		return this.$_select('clientes', options as any) as any;
	}

	collectionAgnostic<
		Args extends VariabledInput<{
			resource?: string | null;
			fields?: Readonly<Array<string | null>> | null;
		}>,
		Sel extends Selection<Agnostic>,
	>(
		args: ExactArgNames<
			Args,
			{
				resource?: string | null;
				fields?: Readonly<Array<string | null>> | null;
			}
		>,
		selectorFn: (s: Agnostic) => [...Sel],
	): $Field<
		'collectionAgnostic',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	>;
	collectionAgnostic<Sel extends Selection<Agnostic>>(
		selectorFn: (s: Agnostic) => [...Sel],
	): $Field<'collectionAgnostic', GetOutput<Sel> | null, GetVariables<Sel>>;
	collectionAgnostic(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				resource: 'String',
				fields: '[String]',
			},
			args,

			selection: selectorFn(new Agnostic()),
		};
		return this.$_select('collectionAgnostic', options as any) as any;
	}

	columnsMetadataResource<
		Args extends VariabledInput<{
			resource?: string | null;
		}>,
		Sel extends Selection<MetadataResource>,
	>(
		args: ExactArgNames<
			Args,
			{
				resource?: string | null;
			}
		>,
		selectorFn: (s: MetadataResource) => [...Sel],
	): $Field<
		'columnsMetadataResource',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	>;
	columnsMetadataResource<Sel extends Selection<MetadataResource>>(
		selectorFn: (s: MetadataResource) => [...Sel],
	): $Field<
		'columnsMetadataResource',
		GetOutput<Sel> | null,
		GetVariables<Sel>
	>;
	columnsMetadataResource(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				resource: 'String',
			},
			args,

			selection: selectorFn(new MetadataResource()),
		};
		return this.$_select('columnsMetadataResource', options as any) as any;
	}

	empresa<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Empresa>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<'empresa', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Empresa()),
		};
		return this.$_select('empresa', options as any) as any;
	}

	empresas<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
		}>,
		Sel extends Selection<EmpresaPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
			}
		>,
		selectorFn: (s: EmpresaPageConnection) => [...Sel],
	): $Field<'empresas', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	empresas<Sel extends Selection<EmpresaPageConnection>>(
		selectorFn: (s: EmpresaPageConnection) => [...Sel],
	): $Field<'empresas', GetOutput<Sel> | null, GetVariables<Sel>>;
	empresas(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
			},
			args,

			selection: selectorFn(new EmpresaPageConnection()),
		};
		return this.$_select('empresas', options as any) as any;
	}

	enclave<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Enclave>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Enclave) => [...Sel],
	): $Field<'enclave', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Enclave()),
		};
		return this.$_select('enclave', options as any) as any;
	}

	enclaves<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<EnclaveCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: EnclaveCursorConnection) => [...Sel],
	): $Field<'enclaves', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	enclaves<Sel extends Selection<EnclaveCursorConnection>>(
		selectorFn: (s: EnclaveCursorConnection) => [...Sel],
	): $Field<'enclaves', GetOutput<Sel> | null, GetVariables<Sel>>;
	enclaves(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new EnclaveCursorConnection()),
		};
		return this.$_select('enclaves', options as any) as any;
	}

	estacion<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Estacion>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Estacion) => [...Sel],
	): $Field<'estacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Estacion()),
		};
		return this.$_select('estacion', options as any) as any;
	}

	estacions<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			nombre?: string | null;
			nombre_list?: Readonly<Array<string | null>> | null;
			alias?: string | null;
			alias_list?: Readonly<Array<string | null>> | null;
			order?: Readonly<Array<EstacionFilter_order | null>> | null;
		}>,
		Sel extends Selection<EstacionPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				nombre?: string | null;
				nombre_list?: Readonly<Array<string | null>> | null;
				alias?: string | null;
				alias_list?: Readonly<Array<string | null>> | null;
				order?: Readonly<Array<EstacionFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: EstacionPageConnection) => [...Sel],
	): $Field<'estacions', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	estacions<Sel extends Selection<EstacionPageConnection>>(
		selectorFn: (s: EstacionPageConnection) => [...Sel],
	): $Field<'estacions', GetOutput<Sel> | null, GetVariables<Sel>>;
	estacions(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				nombre: 'String',
				nombre_list: '[String]',
				alias: 'String',
				alias_list: '[String]',
				order: '[EstacionFilter_order]',
			},
			args,

			selection: selectorFn(new EstacionPageConnection()),
		};
		return this.$_select('estacions', options as any) as any;
	}

	fDN<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<FDN>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: FDN) => [...Sel],
	): $Field<'fDN', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new FDN()),
		};
		return this.$_select('fDN', options as any) as any;
	}

	fDNs<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<FDNCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: FDNCursorConnection) => [...Sel],
	): $Field<'fDNs', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	fDNs<Sel extends Selection<FDNCursorConnection>>(
		selectorFn: (s: FDNCursorConnection) => [...Sel],
	): $Field<'fDNs', GetOutput<Sel> | null, GetVariables<Sel>>;
	fDNs(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new FDNCursorConnection()),
		};
		return this.$_select('fDNs', options as any) as any;
	}

	factura<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Factura>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Factura) => [...Sel],
	): $Field<'factura', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Factura()),
		};
		return this.$_select('factura', options as any) as any;
	}

	facturas<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<FacturaCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: FacturaCursorConnection) => [...Sel],
	): $Field<'facturas', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	facturas<Sel extends Selection<FacturaCursorConnection>>(
		selectorFn: (s: FacturaCursorConnection) => [...Sel],
	): $Field<'facturas', GetOutput<Sel> | null, GetVariables<Sel>>;
	facturas(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new FacturaCursorConnection()),
		};
		return this.$_select('facturas', options as any) as any;
	}

	getFormResource<
		Args extends VariabledInput<{
			entity?: string | null;
		}>,
		Sel extends Selection<FormResource>,
	>(
		args: ExactArgNames<
			Args,
			{
				entity?: string | null;
			}
		>,
		selectorFn: (s: FormResource) => [...Sel],
	): $Field<'getFormResource', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	getFormResource<Sel extends Selection<FormResource>>(
		selectorFn: (s: FormResource) => [...Sel],
	): $Field<'getFormResource', GetOutput<Sel> | null, GetVariables<Sel>>;
	getFormResource(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				entity: 'String',
			},
			args,

			selection: selectorFn(new FormResource()),
		};
		return this.$_select('getFormResource', options as any) as any;
	}

	getMenu<
		Args extends VariabledInput<{
			params?: Iterable | null;
		}>,
		Sel extends Selection<Menu>,
	>(
		args: ExactArgNames<
			Args,
			{
				params?: Iterable | null;
			}
		>,
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'getMenu', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	getMenu<Sel extends Selection<Menu>>(
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'getMenu', GetOutput<Sel> | null, GetVariables<Sel>>;
	getMenu(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				params: 'Iterable',
			},
			args,

			selection: selectorFn(new Menu()),
		};
		return this.$_select('getMenu', options as any) as any;
	}

	getUserByUsernameUser<
		Args extends VariabledInput<{
			username?: string | null;
		}>,
		Sel extends Selection<User>,
	>(
		args: ExactArgNames<
			Args,
			{
				username?: string | null;
			}
		>,
		selectorFn: (s: User) => [...Sel],
	): $Field<
		'getUserByUsernameUser',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	>;
	getUserByUsernameUser<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'getUserByUsernameUser', GetOutput<Sel> | null, GetVariables<Sel>>;
	getUserByUsernameUser(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				username: 'String',
			},
			args,

			selection: selectorFn(new User()),
		};
		return this.$_select('getUserByUsernameUser', options as any) as any;
	}

	localidad<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Localidad>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	localidads<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			nombre?: string | null;
			nombre_list?: Readonly<Array<string | null>> | null;
			order?: Readonly<Array<LocalidadFilter_order | null>> | null;
		}>,
		Sel extends Selection<LocalidadPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				nombre?: string | null;
				nombre_list?: Readonly<Array<string | null>> | null;
				order?: Readonly<Array<LocalidadFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: LocalidadPageConnection) => [...Sel],
	): $Field<'localidads', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	localidads<Sel extends Selection<LocalidadPageConnection>>(
		selectorFn: (s: LocalidadPageConnection) => [...Sel],
	): $Field<'localidads', GetOutput<Sel> | null, GetVariables<Sel>>;
	localidads(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				nombre: 'String',
				nombre_list: '[String]',
				order: '[LocalidadFilter_order]',
			},
			args,

			selection: selectorFn(new LocalidadPageConnection()),
		};
		return this.$_select('localidads', options as any) as any;
	}

	menu<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Menu>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'menu', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Menu()),
		};
		return this.$_select('menu', options as any) as any;
	}

	menus<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<MenuFilter_order | null>> | null;
			tipo?: string | null;
			tipo_list?: Readonly<Array<string | null>> | null;
		}>,
		Sel extends Selection<MenuPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<MenuFilter_order | null>> | null;
				tipo?: string | null;
				tipo_list?: Readonly<Array<string | null>> | null;
			}
		>,
		selectorFn: (s: MenuPageConnection) => [...Sel],
	): $Field<'menus', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	menus<Sel extends Selection<MenuPageConnection>>(
		selectorFn: (s: MenuPageConnection) => [...Sel],
	): $Field<'menus', GetOutput<Sel> | null, GetVariables<Sel>>;
	menus(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[MenuFilter_order]',
				tipo: 'String',
				tipo_list: '[String]',
			},
			args,

			selection: selectorFn(new MenuPageConnection()),
		};
		return this.$_select('menus', options as any) as any;
	}

	nacion<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Nacion>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Nacion) => [...Sel],
	): $Field<'nacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Nacion()),
		};
		return this.$_select('nacion', options as any) as any;
	}

	nacions<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
		}>,
		Sel extends Selection<NacionPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
			}
		>,
		selectorFn: (s: NacionPageConnection) => [...Sel],
	): $Field<'nacions', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	nacions<Sel extends Selection<NacionPageConnection>>(
		selectorFn: (s: NacionPageConnection) => [...Sel],
	): $Field<'nacions', GetOutput<Sel> | null, GetVariables<Sel>>;
	nacions(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
			},
			args,

			selection: selectorFn(new NacionPageConnection()),
		};
		return this.$_select('nacions', options as any) as any;
	}

	node<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Node>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Node) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Node()),
		};
		return this.$_select('node', options as any) as any;
	}

	parada<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Parada>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'parada', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Parada()),
		};
		return this.$_select('parada', options as any) as any;
	}

	paradas<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<ParadaCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: ParadaCursorConnection) => [...Sel],
	): $Field<'paradas', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	paradas<Sel extends Selection<ParadaCursorConnection>>(
		selectorFn: (s: ParadaCursorConnection) => [...Sel],
	): $Field<'paradas', GetOutput<Sel> | null, GetVariables<Sel>>;
	paradas(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new ParadaCursorConnection()),
		};
		return this.$_select('paradas', options as any) as any;
	}

	permiso<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Permiso>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Permiso) => [...Sel],
	): $Field<'permiso', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Permiso()),
		};
		return this.$_select('permiso', options as any) as any;
	}

	permisos<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<PermisoFilter_order | null>> | null;
		}>,
		Sel extends Selection<PermisoPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<PermisoFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'permisos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	permisos<Sel extends Selection<PermisoPageConnection>>(
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'permisos', GetOutput<Sel> | null, GetVariables<Sel>>;
	permisos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[PermisoFilter_order]',
			},
			args,

			selection: selectorFn(new PermisoPageConnection()),
		};
		return this.$_select('permisos', options as any) as any;
	}

	piloto<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Piloto>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Piloto) => [...Sel],
	): $Field<'piloto', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Piloto()),
		};
		return this.$_select('piloto', options as any) as any;
	}

	pilotos<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			email?: string | null;
			email_list?: Readonly<Array<string | null>> | null;
			status?: string | null;
			status_list?: Readonly<Array<string | null>> | null;
			licencia?: string | null;
			licencia_list?: Readonly<Array<string | null>> | null;
			telefono?: string | null;
			telefono_list?: Readonly<Array<string | null>> | null;
			createdAt?: Readonly<Array<PilotoFilter_createdAt | null>> | null;
			order?: Readonly<Array<PilotoFilter_order | null>> | null;
			fullName?: string | null;
		}>,
		Sel extends Selection<PilotoPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				email?: string | null;
				email_list?: Readonly<Array<string | null>> | null;
				status?: string | null;
				status_list?: Readonly<Array<string | null>> | null;
				licencia?: string | null;
				licencia_list?: Readonly<Array<string | null>> | null;
				telefono?: string | null;
				telefono_list?: Readonly<Array<string | null>> | null;
				createdAt?: Readonly<Array<PilotoFilter_createdAt | null>> | null;
				order?: Readonly<Array<PilotoFilter_order | null>> | null;
				fullName?: string | null;
			}
		>,
		selectorFn: (s: PilotoPageConnection) => [...Sel],
	): $Field<'pilotos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	pilotos<Sel extends Selection<PilotoPageConnection>>(
		selectorFn: (s: PilotoPageConnection) => [...Sel],
	): $Field<'pilotos', GetOutput<Sel> | null, GetVariables<Sel>>;
	pilotos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				email: 'String',
				email_list: '[String]',
				status: 'String',
				status_list: '[String]',
				licencia: 'String',
				licencia_list: '[String]',
				telefono: 'String',
				telefono_list: '[String]',
				createdAt: '[PilotoFilter_createdAt]',
				order: '[PilotoFilter_order]',
				fullName: 'String',
			},
			args,

			selection: selectorFn(new PilotoPageConnection()),
		};
		return this.$_select('pilotos', options as any) as any;
	}

	recorrido<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Recorrido>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'recorrido', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('recorrido', options as any) as any;
	}

	recorridoAsientoPrecio<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<RecorridoAsientoPrecio>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: RecorridoAsientoPrecio) => [...Sel],
	): $Field<
		'recorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new RecorridoAsientoPrecio()),
		};
		return this.$_select('recorridoAsientoPrecio', options as any) as any;
	}

	recorridoAsientoPrecios<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<RecorridoAsientoPrecioCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: RecorridoAsientoPrecioCursorConnection) => [...Sel],
	): $Field<
		'recorridoAsientoPrecios',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	>;
	recorridoAsientoPrecios<
		Sel extends Selection<RecorridoAsientoPrecioCursorConnection>,
	>(
		selectorFn: (s: RecorridoAsientoPrecioCursorConnection) => [...Sel],
	): $Field<
		'recorridoAsientoPrecios',
		GetOutput<Sel> | null,
		GetVariables<Sel>
	>;
	recorridoAsientoPrecios(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new RecorridoAsientoPrecioCursorConnection()),
		};
		return this.$_select('recorridoAsientoPrecios', options as any) as any;
	}

	recorridos<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<RecorridoCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: RecorridoCursorConnection) => [...Sel],
	): $Field<'recorridos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	recorridos<Sel extends Selection<RecorridoCursorConnection>>(
		selectorFn: (s: RecorridoCursorConnection) => [...Sel],
	): $Field<'recorridos', GetOutput<Sel> | null, GetVariables<Sel>>;
	recorridos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new RecorridoCursorConnection()),
		};
		return this.$_select('recorridos', options as any) as any;
	}

	role<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Role>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Role) => [...Sel],
	): $Field<'role', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Role()),
		};
		return this.$_select('role', options as any) as any;
	}

	roles<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<RoleFilter_order | null>> | null;
		}>,
		Sel extends Selection<RolePageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<RoleFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	roles<Sel extends Selection<RolePageConnection>>(
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel>>;
	roles(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[RoleFilter_order]',
			},
			args,

			selection: selectorFn(new RolePageConnection()),
		};
		return this.$_select('roles', options as any) as any;
	}

	salida<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Salida>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'salida', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Salida()),
		};
		return this.$_select('salida', options as any) as any;
	}

	salidaLog<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<SalidaLog>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: SalidaLog) => [...Sel],
	): $Field<'salidaLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new SalidaLog()),
		};
		return this.$_select('salidaLog', options as any) as any;
	}

	salidaLogs<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<SalidaLogCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: SalidaLogCursorConnection) => [...Sel],
	): $Field<'salidaLogs', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	salidaLogs<Sel extends Selection<SalidaLogCursorConnection>>(
		selectorFn: (s: SalidaLogCursorConnection) => [...Sel],
	): $Field<'salidaLogs', GetOutput<Sel> | null, GetVariables<Sel>>;
	salidaLogs(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new SalidaLogCursorConnection()),
		};
		return this.$_select('salidaLogs', options as any) as any;
	}

	salidas<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<SalidaCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: SalidaCursorConnection) => [...Sel],
	): $Field<'salidas', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	salidas<Sel extends Selection<SalidaCursorConnection>>(
		selectorFn: (s: SalidaCursorConnection) => [...Sel],
	): $Field<'salidas', GetOutput<Sel> | null, GetVariables<Sel>>;
	salidas(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new SalidaCursorConnection()),
		};
		return this.$_select('salidas', options as any) as any;
	}

	taxa<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<TaxonCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: TaxonCursorConnection) => [...Sel],
	): $Field<'taxa', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	taxa<Sel extends Selection<TaxonCursorConnection>>(
		selectorFn: (s: TaxonCursorConnection) => [...Sel],
	): $Field<'taxa', GetOutput<Sel> | null, GetVariables<Sel>>;
	taxa(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new TaxonCursorConnection()),
		};
		return this.$_select('taxa', options as any) as any;
	}

	taxon<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Taxon>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Taxon) => [...Sel],
	): $Field<'taxon', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Taxon()),
		};
		return this.$_select('taxon', options as any) as any;
	}

	user<
		Args extends VariabledInput<{
			username?: string | null;
		}>,
		Sel extends Selection<User>,
	>(
		args: ExactArgNames<
			Args,
			{
				username?: string | null;
			}
		>,
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel>>;
	user(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				username: 'String',
			},
			args,

			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}

	users<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			username?: string | null;
			username_list?: Readonly<Array<string | null>> | null;
			status?: string | null;
			status_list?: Readonly<Array<string | null>> | null;
			nombre?: string | null;
			nombre_list?: Readonly<Array<string | null>> | null;
			apellido?: string | null;
			apellido_list?: Readonly<Array<string | null>> | null;
			createdAt?: Readonly<Array<UserFilter_createdAt | null>> | null;
			order?: Readonly<Array<UserFilter_order | null>> | null;
		}>,
		Sel extends Selection<UserPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				username?: string | null;
				username_list?: Readonly<Array<string | null>> | null;
				status?: string | null;
				status_list?: Readonly<Array<string | null>> | null;
				nombre?: string | null;
				nombre_list?: Readonly<Array<string | null>> | null;
				apellido?: string | null;
				apellido_list?: Readonly<Array<string | null>> | null;
				createdAt?: Readonly<Array<UserFilter_createdAt | null>> | null;
				order?: Readonly<Array<UserFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: UserPageConnection) => [...Sel],
	): $Field<'users', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	users<Sel extends Selection<UserPageConnection>>(
		selectorFn: (s: UserPageConnection) => [...Sel],
	): $Field<'users', GetOutput<Sel> | null, GetVariables<Sel>>;
	users(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				username: 'String',
				username_list: '[String]',
				status: 'String',
				status_list: '[String]',
				nombre: 'String',
				nombre_list: '[String]',
				apellido: 'String',
				apellido_list: '[String]',
				createdAt: '[UserFilter_createdAt]',
				order: '[UserFilter_order]',
			},
			args,

			selection: selectorFn(new UserPageConnection()),
		};
		return this.$_select('users', options as any) as any;
	}

	venta<
		Args extends VariabledInput<{
			id: string;
		}>,
		Sel extends Selection<Venta>,
	>(
		args: ExactArgNames<
			Args,
			{
				id: string;
			}
		>,
		selectorFn: (s: Venta) => [...Sel],
	): $Field<'venta', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				id: 'ID!',
			},
			args,

			selection: selectorFn(new Venta()),
		};
		return this.$_select('venta', options as any) as any;
	}

	ventas<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<VentaCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: VentaCursorConnection) => [...Sel],
	): $Field<'ventas', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	ventas<Sel extends Selection<VentaCursorConnection>>(
		selectorFn: (s: VentaCursorConnection) => [...Sel],
	): $Field<'ventas', GetOutput<Sel> | null, GetVariables<Sel>>;
	ventas(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new VentaCursorConnection()),
		};
		return this.$_select('ventas', options as any) as any;
	}
}

/**
 * A node, according to the Relay specification.
 */
export class Node extends $Interface<
	{
		Agnostic: Agnostic;
		FormResource: FormResource;
		MetadataResource: MetadataResource;
		Action: Action;
		Role: Role;
		Permiso: Permiso;
		Agencia: Agencia;
		User: User;
		Localidad: Localidad;
		Nacion: Nacion;
		Asiento: Asiento;
		Bus: Bus;
		Empresa: Empresa;
		Piloto: Piloto;
		Boleto: Boleto;
		Cliente: Cliente;
		BoletoLog: BoletoLog;
		Salida: Salida;
		Recorrido: Recorrido;
		Parada: Parada;
		Enclave: Enclave;
		SalidaLog: SalidaLog;
		Estacion: Estacion;
		FDN: FDN;
		Factura: Factura;
		Venta: Venta;
		Menu: Menu;
		RecorridoAsientoPrecio: RecorridoAsientoPrecio;
		Taxon: Taxon;
	},
	'Node'
> {
	constructor() {
		super(
			{
				Agnostic: Agnostic,
				FormResource: FormResource,
				MetadataResource: MetadataResource,
				Action: Action,
				Role: Role,
				Permiso: Permiso,
				Agencia: Agencia,
				User: User,
				Localidad: Localidad,
				Nacion: Nacion,
				Asiento: Asiento,
				Bus: Bus,
				Empresa: Empresa,
				Piloto: Piloto,
				Boleto: Boleto,
				Cliente: Cliente,
				BoletoLog: BoletoLog,
				Salida: Salida,
				Recorrido: Recorrido,
				Parada: Parada,
				Enclave: Enclave,
				SalidaLog: SalidaLog,
				Estacion: Estacion,
				FDN: FDN,
				Factura: Factura,
				Venta: Venta,
				Menu: Menu,
				RecorridoAsientoPrecio: RecorridoAsientoPrecio,
				Taxon: Taxon,
			},
			'Node',
		);
	}

	/**
	 * The id of this node.
	 */
	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}
}

export class Agnostic extends $Base<'Agnostic'> {
	constructor() {
		super('Agnostic');
	}

	get data(): $Field<'data', Iterable> {
		return this.$_select('data') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}
}

/**
 * The `Iterable` scalar type represents an array or a Traversable with any kind of data.
 */
export type Iterable = string;

export class FormResource extends $Base<'FormResource'> {
	constructor() {
		super('FormResource');
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get schema(): $Field<'schema', Iterable> {
		return this.$_select('schema') as any;
	}
}

export class MetadataResource extends $Base<'MetadataResource'> {
	constructor() {
		super('MetadataResource');
	}

	get _id(): $Field<'_id', string> {
		return this.$_select('_id') as any;
	}

	get data(): $Field<'data', Iterable> {
		return this.$_select('data') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}
}

export class Action extends $Base<'Action'> {
	constructor() {
		super('Action');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	roles<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<RoleFilter_order | null>> | null;
		}>,
		Sel extends Selection<RolePageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<RoleFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	roles<Sel extends Selection<RolePageConnection>>(
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel>>;
	roles(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[RoleFilter_order]',
			},
			args,

			selection: selectorFn(new RolePageConnection()),
		};
		return this.$_select('roles', options as any) as any;
	}

	get ruta(): $Field<'ruta', string | null> {
		return this.$_select('ruta') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}
}

export type RoleFilter_order = {
	id?: string | null;
	nombre?: string | null;
};

/**
 * Page connection for Role.
 */
export class RolePageConnection extends $Base<'RolePageConnection'> {
	constructor() {
		super('RolePageConnection');
	}

	collection<Sel extends Selection<Role>>(
		selectorFn: (s: Role) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Role()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<RolePaginationInfo>>(
		selectorFn: (s: RolePaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new RolePaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

export class Role extends $Base<'Role'> {
	constructor() {
		super('Role');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	actions<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<ActionFilter_order | null>> | null;
		}>,
		Sel extends Selection<ActionPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<ActionFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: ActionPageConnection) => [...Sel],
	): $Field<'actions', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	actions<Sel extends Selection<ActionPageConnection>>(
		selectorFn: (s: ActionPageConnection) => [...Sel],
	): $Field<'actions', GetOutput<Sel> | null, GetVariables<Sel>>;
	actions(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[ActionFilter_order]',
			},
			args,

			selection: selectorFn(new ActionPageConnection()),
		};
		return this.$_select('actions', options as any) as any;
	}

	children<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<RoleFilter_order | null>> | null;
		}>,
		Sel extends Selection<RolePageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<RoleFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	children<Sel extends Selection<RolePageConnection>>(
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel>>;
	children(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[RoleFilter_order]',
			},
			args,

			selection: selectorFn(new RolePageConnection()),
		};
		return this.$_select('children', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}

	parents<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<RoleFilter_order | null>> | null;
		}>,
		Sel extends Selection<RolePageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<RoleFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'parents', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	parents<Sel extends Selection<RolePageConnection>>(
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'parents', GetOutput<Sel> | null, GetVariables<Sel>>;
	parents(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[RoleFilter_order]',
			},
			args,

			selection: selectorFn(new RolePageConnection()),
		};
		return this.$_select('parents', options as any) as any;
	}

	permisos<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<PermisoFilter_order | null>> | null;
		}>,
		Sel extends Selection<PermisoPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<PermisoFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'permisos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	permisos<Sel extends Selection<PermisoPageConnection>>(
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'permisos', GetOutput<Sel> | null, GetVariables<Sel>>;
	permisos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[PermisoFilter_order]',
			},
			args,

			selection: selectorFn(new PermisoPageConnection()),
		};
		return this.$_select('permisos', options as any) as any;
	}
}

export type PermisoFilter_order = {
	id?: string | null;
	nombre?: string | null;
	status?: string | null;
};

/**
 * Page connection for Permiso.
 */
export class PermisoPageConnection extends $Base<'PermisoPageConnection'> {
	constructor() {
		super('PermisoPageConnection');
	}

	collection<Sel extends Selection<Permiso>>(
		selectorFn: (s: Permiso) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Permiso()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<PermisoPaginationInfo>>(
		selectorFn: (s: PermisoPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new PermisoPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

export class Permiso extends $Base<'Permiso'> {
	constructor() {
		super('Permiso');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	children<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<PermisoFilter_order | null>> | null;
		}>,
		Sel extends Selection<PermisoPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<PermisoFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	children<Sel extends Selection<PermisoPageConnection>>(
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel>>;
	children(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[PermisoFilter_order]',
			},
			args,

			selection: selectorFn(new PermisoPageConnection()),
		};
		return this.$_select('children', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	parents<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<PermisoFilter_order | null>> | null;
		}>,
		Sel extends Selection<PermisoPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<PermisoFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'parents', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	parents<Sel extends Selection<PermisoPageConnection>>(
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'parents', GetOutput<Sel> | null, GetVariables<Sel>>;
	parents(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[PermisoFilter_order]',
			},
			args,

			selection: selectorFn(new PermisoPageConnection()),
		};
		return this.$_select('parents', options as any) as any;
	}

	roles<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<RoleFilter_order | null>> | null;
		}>,
		Sel extends Selection<RolePageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<RoleFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	roles<Sel extends Selection<RolePageConnection>>(
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel>>;
	roles(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[RoleFilter_order]',
			},
			args,

			selection: selectorFn(new RolePageConnection()),
		};
		return this.$_select('roles', options as any) as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}
}

export enum Status {
	creado = 'creado',

	progreso = 'progreso',

	finalizado = 'finalizado',

	activo = 'activo',

	inactivo = 'inactivo',

	cancelado = 'cancelado',

	error = 'error',

	pausa = 'pausa',

	confirmado = 'confirmado',

	expirado = 'expirado',

	reasignado = 'reasignado',
}

/**
 * Information about the pagination.
 */
export class PermisoPaginationInfo extends $Base<'PermisoPaginationInfo'> {
	constructor() {
		super('PermisoPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

export type ActionFilter_order = {
	id?: string | null;
	nombre?: string | null;
	status?: string | null;
};

/**
 * Page connection for Action.
 */
export class ActionPageConnection extends $Base<'ActionPageConnection'> {
	constructor() {
		super('ActionPageConnection');
	}

	collection<Sel extends Selection<Action>>(
		selectorFn: (s: Action) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Action()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<ActionPaginationInfo>>(
		selectorFn: (s: ActionPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new ActionPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class ActionPaginationInfo extends $Base<'ActionPaginationInfo'> {
	constructor() {
		super('ActionPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Information about the pagination.
 */
export class RolePaginationInfo extends $Base<'RolePaginationInfo'> {
	constructor() {
		super('RolePaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Cursor connection for Agencia.
 */
export class AgenciaCursorConnection extends $Base<'AgenciaCursorConnection'> {
	constructor() {
		super('AgenciaCursorConnection');
	}

	edges<Sel extends Selection<AgenciaEdge>>(
		selectorFn: (s: AgenciaEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new AgenciaEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<AgenciaPageInfo>>(
		selectorFn: (s: AgenciaPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new AgenciaPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Agencia.
 */
export class AgenciaEdge extends $Base<'AgenciaEdge'> {
	constructor() {
		super('AgenciaEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Agencia>>(
		selectorFn: (s: Agencia) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Agencia()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class Agencia extends $Base<'Agencia'> {
	constructor() {
		super('Agencia');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get alias(): $Field<'alias', string> {
		return this.$_select('alias') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}

	users<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			username?: string | null;
			username_list?: Readonly<Array<string | null>> | null;
			status?: string | null;
			status_list?: Readonly<Array<string | null>> | null;
			nombre?: string | null;
			nombre_list?: Readonly<Array<string | null>> | null;
			apellido?: string | null;
			apellido_list?: Readonly<Array<string | null>> | null;
			createdAt?: Readonly<Array<UserFilter_createdAt | null>> | null;
			order?: Readonly<Array<UserFilter_order | null>> | null;
		}>,
		Sel extends Selection<UserPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				username?: string | null;
				username_list?: Readonly<Array<string | null>> | null;
				status?: string | null;
				status_list?: Readonly<Array<string | null>> | null;
				nombre?: string | null;
				nombre_list?: Readonly<Array<string | null>> | null;
				apellido?: string | null;
				apellido_list?: Readonly<Array<string | null>> | null;
				createdAt?: Readonly<Array<UserFilter_createdAt | null>> | null;
				order?: Readonly<Array<UserFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: UserPageConnection) => [...Sel],
	): $Field<'users', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	users<Sel extends Selection<UserPageConnection>>(
		selectorFn: (s: UserPageConnection) => [...Sel],
	): $Field<'users', GetOutput<Sel> | null, GetVariables<Sel>>;
	users(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				username: 'String',
				username_list: '[String]',
				status: 'String',
				status_list: '[String]',
				nombre: 'String',
				nombre_list: '[String]',
				apellido: 'String',
				apellido_list: '[String]',
				createdAt: '[UserFilter_createdAt]',
				order: '[UserFilter_order]',
			},
			args,

			selection: selectorFn(new UserPageConnection()),
		};
		return this.$_select('users', options as any) as any;
	}
}

export type UserFilter_createdAt = {
	after?: string | null;
	before?: string | null;
	strictly_after?: string | null;
	strictly_before?: string | null;
};

export type UserFilter_order = {
	apellido?: string | null;
	createdAt?: string | null;
	id?: string | null;
	nombre?: string | null;
	status?: string | null;
	username?: string | null;
};

/**
 * Page connection for User.
 */
export class UserPageConnection extends $Base<'UserPageConnection'> {
	constructor() {
		super('UserPageConnection');
	}

	collection<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<UserPaginationInfo>>(
		selectorFn: (s: UserPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new UserPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

export class User extends $Base<'User'> {
	constructor() {
		super('User');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get apellido(): $Field<'apellido', string | null> {
		return this.$_select('apellido') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get fullName(): $Field<'fullName', string | null> {
		return this.$_select('fullName') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nit(): $Field<'nit', string | null> {
		return this.$_select('nit') as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}

	get password(): $Field<'password', string | null> {
		return this.$_select('password') as any;
	}

	permisos<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<PermisoFilter_order | null>> | null;
		}>,
		Sel extends Selection<PermisoPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<PermisoFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'permisos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	permisos<Sel extends Selection<PermisoPageConnection>>(
		selectorFn: (s: PermisoPageConnection) => [...Sel],
	): $Field<'permisos', GetOutput<Sel> | null, GetVariables<Sel>>;
	permisos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[PermisoFilter_order]',
			},
			args,

			selection: selectorFn(new PermisoPageConnection()),
		};
		return this.$_select('permisos', options as any) as any;
	}

	roles<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<RoleFilter_order | null>> | null;
		}>,
		Sel extends Selection<RolePageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<RoleFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	roles<Sel extends Selection<RolePageConnection>>(
		selectorFn: (s: RolePageConnection) => [...Sel],
	): $Field<'roles', GetOutput<Sel> | null, GetVariables<Sel>>;
	roles(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[RoleFilter_order]',
			},
			args,

			selection: selectorFn(new RolePageConnection()),
		};
		return this.$_select('roles', options as any) as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}

	get userIdentifier(): $Field<'userIdentifier', string> {
		return this.$_select('userIdentifier') as any;
	}

	get username(): $Field<'username', string> {
		return this.$_select('username') as any;
	}

	get validTokenStrings(): $Field<'validTokenStrings', Iterable> {
		return this.$_select('validTokenStrings') as any;
	}
}

export class Localidad extends $Base<'Localidad'> {
	constructor() {
		super('Localidad');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	nacion<Sel extends Selection<Nacion>>(
		selectorFn: (s: Nacion) => [...Sel],
	): $Field<'nacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Nacion()),
		};
		return this.$_select('nacion', options as any) as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}
}

export class Nacion extends $Base<'Nacion'> {
	constructor() {
		super('Nacion');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}
}

/**
 * Information about the pagination.
 */
export class UserPaginationInfo extends $Base<'UserPaginationInfo'> {
	constructor() {
		super('UserPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Information about the current page.
 */
export class AgenciaPageInfo extends $Base<'AgenciaPageInfo'> {
	constructor() {
		super('AgenciaPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for Asiento.
 */
export class AsientoCursorConnection extends $Base<'AsientoCursorConnection'> {
	constructor() {
		super('AsientoCursorConnection');
	}

	edges<Sel extends Selection<AsientoEdge>>(
		selectorFn: (s: AsientoEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new AsientoEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<AsientoPageInfo>>(
		selectorFn: (s: AsientoPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new AsientoPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Asiento.
 */
export class AsientoEdge extends $Base<'AsientoEdge'> {
	constructor() {
		super('AsientoEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Asiento>>(
		selectorFn: (s: Asiento) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Asiento()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class Asiento extends $Base<'Asiento'> {
	constructor() {
		super('Asiento');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	bus<Sel extends Selection<Bus>>(
		selectorFn: (s: Bus) => [...Sel],
	): $Field<'bus', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Bus()),
		};
		return this.$_select('bus', options as any) as any;
	}

	get clase(): $Field<'clase', string | null> {
		return this.$_select('clase') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get numero(): $Field<'numero', number> {
		return this.$_select('numero') as any;
	}
}

export class Bus extends $Base<'Bus'> {
	constructor() {
		super('Bus');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	asientos<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<AsientoCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: AsientoCursorConnection) => [...Sel],
	): $Field<'asientos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	asientos<Sel extends Selection<AsientoCursorConnection>>(
		selectorFn: (s: AsientoCursorConnection) => [...Sel],
	): $Field<'asientos', GetOutput<Sel> | null, GetVariables<Sel>>;
	asientos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new AsientoCursorConnection()),
		};
		return this.$_select('asientos', options as any) as any;
	}

	get codigo(): $Field<'codigo', string | null> {
		return this.$_select('codigo') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	empresa<Sel extends Selection<Empresa>>(
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<'empresa', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Empresa()),
		};
		return this.$_select('empresa', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	get marca(): $Field<'marca', string | null> {
		return this.$_select('marca') as any;
	}

	piloto<Sel extends Selection<Piloto>>(
		selectorFn: (s: Piloto) => [...Sel],
	): $Field<'piloto', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Piloto()),
		};
		return this.$_select('piloto', options as any) as any;
	}

	get placa(): $Field<'placa', string | null> {
		return this.$_select('placa') as any;
	}

	get precioVariacionAsientoA(): $Field<
		'precioVariacionAsientoA',
		number | null
	> {
		return this.$_select('precioVariacionAsientoA') as any;
	}

	get precioVariacionAsientoB(): $Field<
		'precioVariacionAsientoB',
		number | null
	> {
		return this.$_select('precioVariacionAsientoB') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}
}

export class Empresa extends $Base<'Empresa'> {
	constructor() {
		super('Empresa');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get alias(): $Field<'alias', string | null> {
		return this.$_select('alias') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get denominacionSocial(): $Field<'denominacionSocial', string | null> {
		return this.$_select('denominacionSocial') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nit(): $Field<'nit', string | null> {
		return this.$_select('nit') as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}

	get nombreComercial(): $Field<'nombreComercial', string | null> {
		return this.$_select('nombreComercial') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}
}

export class Piloto extends $Base<'Piloto'> {
	constructor() {
		super('Piloto');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get apellido(): $Field<'apellido', string | null> {
		return this.$_select('apellido') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get dpi(): $Field<'dpi', string | null> {
		return this.$_select('dpi') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get fechaNacimiento(): $Field<'fechaNacimiento', string | null> {
		return this.$_select('fechaNacimiento') as any;
	}

	get fullName(): $Field<'fullName', string | null> {
		return this.$_select('fullName') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	get licencia(): $Field<'licencia', string | null> {
		return this.$_select('licencia') as any;
	}

	get licenciaVencimiento(): $Field<'licenciaVencimiento', string | null> {
		return this.$_select('licenciaVencimiento') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nacionalidad(): $Field<'nacionalidad', string | null> {
		return this.$_select('nacionalidad') as any;
	}

	get nit(): $Field<'nit', string | null> {
		return this.$_select('nit') as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}

	get seguroSocial(): $Field<'seguroSocial', string | null> {
		return this.$_select('seguroSocial') as any;
	}

	get sexo(): $Field<'sexo', string | null> {
		return this.$_select('sexo') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}
}

/**
 * Information about the current page.
 */
export class AsientoPageInfo extends $Base<'AsientoPageInfo'> {
	constructor() {
		super('AsientoPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for Boleto.
 */
export class BoletoCursorConnection extends $Base<'BoletoCursorConnection'> {
	constructor() {
		super('BoletoCursorConnection');
	}

	edges<Sel extends Selection<BoletoEdge>>(
		selectorFn: (s: BoletoEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<BoletoPageInfo>>(
		selectorFn: (s: BoletoPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Boleto.
 */
export class BoletoEdge extends $Base<'BoletoEdge'> {
	constructor() {
		super('BoletoEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Boleto>>(
		selectorFn: (s: Boleto) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Boleto()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class Boleto extends $Base<'Boleto'> {
	constructor() {
		super('Boleto');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	asiento<Sel extends Selection<Asiento>>(
		selectorFn: (s: Asiento) => [...Sel],
	): $Field<'asiento', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Asiento()),
		};
		return this.$_select('asiento', options as any) as any;
	}

	boletoLogs<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<BoletoLogCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: BoletoLogCursorConnection) => [...Sel],
	): $Field<'boletoLogs', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	boletoLogs<Sel extends Selection<BoletoLogCursorConnection>>(
		selectorFn: (s: BoletoLogCursorConnection) => [...Sel],
	): $Field<'boletoLogs', GetOutput<Sel> | null, GetVariables<Sel>>;
	boletoLogs(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new BoletoLogCursorConnection()),
		};
		return this.$_select('boletoLogs', options as any) as any;
	}

	cliente<Sel extends Selection<Cliente>>(
		selectorFn: (s: Cliente) => [...Sel],
	): $Field<'cliente', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Cliente()),
		};
		return this.$_select('cliente', options as any) as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get precio(): $Field<'precio', number | null> {
		return this.$_select('precio') as any;
	}

	salida<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'salida', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('salida', options as any) as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}
}

export class Cliente extends $Base<'Cliente'> {
	constructor() {
		super('Cliente');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get apellido(): $Field<'apellido', string | null> {
		return this.$_select('apellido') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get dpi(): $Field<'dpi', string | null> {
		return this.$_select('dpi') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nit(): $Field<'nit', string | null> {
		return this.$_select('nit') as any;
	}

	get nombre(): $Field<'nombre', string> {
		return this.$_select('nombre') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}
}

/**
 * Cursor connection for BoletoLog.
 */
export class BoletoLogCursorConnection extends $Base<'BoletoLogCursorConnection'> {
	constructor() {
		super('BoletoLogCursorConnection');
	}

	edges<Sel extends Selection<BoletoLogEdge>>(
		selectorFn: (s: BoletoLogEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoLogEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<BoletoLogPageInfo>>(
		selectorFn: (s: BoletoLogPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoLogPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of BoletoLog.
 */
export class BoletoLogEdge extends $Base<'BoletoLogEdge'> {
	constructor() {
		super('BoletoLogEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<BoletoLog>>(
		selectorFn: (s: BoletoLog) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoLog()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class BoletoLog extends $Base<'BoletoLog'> {
	constructor() {
		super('BoletoLog');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	boleto<Sel extends Selection<Boleto>>(
		selectorFn: (s: Boleto) => [...Sel],
	): $Field<'boleto', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Boleto()),
		};
		return this.$_select('boleto', options as any) as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get descripcion(): $Field<'descripcion', string | null> {
		return this.$_select('descripcion') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get tipo(): $Field<'tipo', number | null> {
		return this.$_select('tipo') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}

	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class BoletoLogPageInfo extends $Base<'BoletoLogPageInfo'> {
	constructor() {
		super('BoletoLogPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

export class Salida extends $Base<'Salida'> {
	constructor() {
		super('Salida');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	boletos<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<BoletoCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: BoletoCursorConnection) => [...Sel],
	): $Field<'boletos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	boletos<Sel extends Selection<BoletoCursorConnection>>(
		selectorFn: (s: BoletoCursorConnection) => [...Sel],
	): $Field<'boletos', GetOutput<Sel> | null, GetVariables<Sel>>;
	boletos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new BoletoCursorConnection()),
		};
		return this.$_select('boletos', options as any) as any;
	}

	bus<Sel extends Selection<Bus>>(
		selectorFn: (s: Bus) => [...Sel],
	): $Field<'bus', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Bus()),
		};
		return this.$_select('bus', options as any) as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	empresa<Sel extends Selection<Empresa>>(
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<'empresa', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Empresa()),
		};
		return this.$_select('empresa', options as any) as any;
	}

	get fecha(): $Field<'fecha', string | null> {
		return this.$_select('fecha') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	recorrido<Sel extends Selection<Recorrido>>(
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'recorrido', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('recorrido', options as any) as any;
	}

	salidaLogs<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<SalidaLogCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: SalidaLogCursorConnection) => [...Sel],
	): $Field<'salidaLogs', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	salidaLogs<Sel extends Selection<SalidaLogCursorConnection>>(
		selectorFn: (s: SalidaLogCursorConnection) => [...Sel],
	): $Field<'salidaLogs', GetOutput<Sel> | null, GetVariables<Sel>>;
	salidaLogs(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new SalidaLogCursorConnection()),
		};
		return this.$_select('salidaLogs', options as any) as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}
}

export class Recorrido extends $Base<'Recorrido'> {
	constructor() {
		super('Recorrido');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get distancia(): $Field<'distancia', number | null> {
		return this.$_select('distancia') as any;
	}

	final<Sel extends Selection<Parada>>(
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'final', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Parada()),
		};
		return this.$_select('final', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	inicio<Sel extends Selection<Parada>>(
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'inicio', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Parada()),
		};
		return this.$_select('inicio', options as any) as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get tiempo(): $Field<'tiempo', string | null> {
		return this.$_select('tiempo') as any;
	}
}

export class Parada extends $Base<'Parada'> {
	constructor() {
		super('Parada');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	enclave<Sel extends Selection<Enclave>>(
		selectorFn: (s: Enclave) => [...Sel],
	): $Field<'enclave', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Enclave()),
		};
		return this.$_select('enclave', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	recorridos<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<RecorridoCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: RecorridoCursorConnection) => [...Sel],
	): $Field<'recorridos', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	recorridos<Sel extends Selection<RecorridoCursorConnection>>(
		selectorFn: (s: RecorridoCursorConnection) => [...Sel],
	): $Field<'recorridos', GetOutput<Sel> | null, GetVariables<Sel>>;
	recorridos(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new RecorridoCursorConnection()),
		};
		return this.$_select('recorridos', options as any) as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}
}

export class Enclave extends $Base<'Enclave'> {
	constructor() {
		super('Enclave');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}
}

/**
 * Cursor connection for Recorrido.
 */
export class RecorridoCursorConnection extends $Base<'RecorridoCursorConnection'> {
	constructor() {
		super('RecorridoCursorConnection');
	}

	edges<Sel extends Selection<RecorridoEdge>>(
		selectorFn: (s: RecorridoEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new RecorridoEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<RecorridoPageInfo>>(
		selectorFn: (s: RecorridoPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new RecorridoPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Recorrido.
 */
export class RecorridoEdge extends $Base<'RecorridoEdge'> {
	constructor() {
		super('RecorridoEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Recorrido>>(
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('node', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class RecorridoPageInfo extends $Base<'RecorridoPageInfo'> {
	constructor() {
		super('RecorridoPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for SalidaLog.
 */
export class SalidaLogCursorConnection extends $Base<'SalidaLogCursorConnection'> {
	constructor() {
		super('SalidaLogCursorConnection');
	}

	edges<Sel extends Selection<SalidaLogEdge>>(
		selectorFn: (s: SalidaLogEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaLogEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<SalidaLogPageInfo>>(
		selectorFn: (s: SalidaLogPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaLogPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of SalidaLog.
 */
export class SalidaLogEdge extends $Base<'SalidaLogEdge'> {
	constructor() {
		super('SalidaLogEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<SalidaLog>>(
		selectorFn: (s: SalidaLog) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaLog()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class SalidaLog extends $Base<'SalidaLog'> {
	constructor() {
		super('SalidaLog');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get descripcion(): $Field<'descripcion', string | null> {
		return this.$_select('descripcion') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	salida<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'salida', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('salida', options as any) as any;
	}

	get tipo(): $Field<'tipo', string | null> {
		return this.$_select('tipo') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}

	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class SalidaLogPageInfo extends $Base<'SalidaLogPageInfo'> {
	constructor() {
		super('SalidaLogPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Information about the current page.
 */
export class BoletoPageInfo extends $Base<'BoletoPageInfo'> {
	constructor() {
		super('BoletoPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

export type BusFilter_createdAt = {
	after?: string | null;
	before?: string | null;
	strictly_after?: string | null;
	strictly_before?: string | null;
};

export type BusFilter_order = {
	createdAt?: string | null;
	id?: string | null;
	marca?: string | null;
	placa?: string | null;
	status?: string | null;
};

/**
 * Page connection for Bus.
 */
export class BusPageConnection extends $Base<'BusPageConnection'> {
	constructor() {
		super('BusPageConnection');
	}

	collection<Sel extends Selection<Bus>>(
		selectorFn: (s: Bus) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Bus()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<BusPaginationInfo>>(
		selectorFn: (s: BusPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BusPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class BusPaginationInfo extends $Base<'BusPaginationInfo'> {
	constructor() {
		super('BusPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Cursor connection for Cliente.
 */
export class ClienteCursorConnection extends $Base<'ClienteCursorConnection'> {
	constructor() {
		super('ClienteCursorConnection');
	}

	edges<Sel extends Selection<ClienteEdge>>(
		selectorFn: (s: ClienteEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new ClienteEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<ClientePageInfo>>(
		selectorFn: (s: ClientePageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new ClientePageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Cliente.
 */
export class ClienteEdge extends $Base<'ClienteEdge'> {
	constructor() {
		super('ClienteEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Cliente>>(
		selectorFn: (s: Cliente) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Cliente()),
		};
		return this.$_select('node', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class ClientePageInfo extends $Base<'ClientePageInfo'> {
	constructor() {
		super('ClientePageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Page connection for Empresa.
 */
export class EmpresaPageConnection extends $Base<'EmpresaPageConnection'> {
	constructor() {
		super('EmpresaPageConnection');
	}

	collection<Sel extends Selection<Empresa>>(
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Empresa()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<EmpresaPaginationInfo>>(
		selectorFn: (s: EmpresaPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new EmpresaPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class EmpresaPaginationInfo extends $Base<'EmpresaPaginationInfo'> {
	constructor() {
		super('EmpresaPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Cursor connection for Enclave.
 */
export class EnclaveCursorConnection extends $Base<'EnclaveCursorConnection'> {
	constructor() {
		super('EnclaveCursorConnection');
	}

	edges<Sel extends Selection<EnclaveEdge>>(
		selectorFn: (s: EnclaveEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new EnclaveEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<EnclavePageInfo>>(
		selectorFn: (s: EnclavePageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new EnclavePageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Enclave.
 */
export class EnclaveEdge extends $Base<'EnclaveEdge'> {
	constructor() {
		super('EnclaveEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Enclave>>(
		selectorFn: (s: Enclave) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Enclave()),
		};
		return this.$_select('node', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class EnclavePageInfo extends $Base<'EnclavePageInfo'> {
	constructor() {
		super('EnclavePageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

export class Estacion extends $Base<'Estacion'> {
	constructor() {
		super('Estacion');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get alias(): $Field<'alias', string> {
		return this.$_select('alias') as any;
	}

	get direccion(): $Field<'direccion', string | null> {
		return this.$_select('direccion') as any;
	}

	get email(): $Field<'email', string | null> {
		return this.$_select('email') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get legacyId(): $Field<'legacyId', number | null> {
		return this.$_select('legacyId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	get slug(): $Field<'slug', string | null> {
		return this.$_select('slug') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get telefono(): $Field<'telefono', string | null> {
		return this.$_select('telefono') as any;
	}

	users<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			id?: number | null;
			id_list?: Readonly<Array<number | null>> | null;
			username?: string | null;
			username_list?: Readonly<Array<string | null>> | null;
			status?: string | null;
			status_list?: Readonly<Array<string | null>> | null;
			nombre?: string | null;
			nombre_list?: Readonly<Array<string | null>> | null;
			apellido?: string | null;
			apellido_list?: Readonly<Array<string | null>> | null;
			createdAt?: Readonly<Array<UserFilter_createdAt | null>> | null;
			order?: Readonly<Array<UserFilter_order | null>> | null;
		}>,
		Sel extends Selection<UserPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				id?: number | null;
				id_list?: Readonly<Array<number | null>> | null;
				username?: string | null;
				username_list?: Readonly<Array<string | null>> | null;
				status?: string | null;
				status_list?: Readonly<Array<string | null>> | null;
				nombre?: string | null;
				nombre_list?: Readonly<Array<string | null>> | null;
				apellido?: string | null;
				apellido_list?: Readonly<Array<string | null>> | null;
				createdAt?: Readonly<Array<UserFilter_createdAt | null>> | null;
				order?: Readonly<Array<UserFilter_order | null>> | null;
			}
		>,
		selectorFn: (s: UserPageConnection) => [...Sel],
	): $Field<'users', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	users<Sel extends Selection<UserPageConnection>>(
		selectorFn: (s: UserPageConnection) => [...Sel],
	): $Field<'users', GetOutput<Sel> | null, GetVariables<Sel>>;
	users(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				id: 'Int',
				id_list: '[Int]',
				username: 'String',
				username_list: '[String]',
				status: 'String',
				status_list: '[String]',
				nombre: 'String',
				nombre_list: '[String]',
				apellido: 'String',
				apellido_list: '[String]',
				createdAt: '[UserFilter_createdAt]',
				order: '[UserFilter_order]',
			},
			args,

			selection: selectorFn(new UserPageConnection()),
		};
		return this.$_select('users', options as any) as any;
	}
}

export type EstacionFilter_order = {
	alias?: string | null;
	id?: string | null;
	nombre?: string | null;
	status?: string | null;
};

/**
 * Page connection for Estacion.
 */
export class EstacionPageConnection extends $Base<'EstacionPageConnection'> {
	constructor() {
		super('EstacionPageConnection');
	}

	collection<Sel extends Selection<Estacion>>(
		selectorFn: (s: Estacion) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Estacion()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<EstacionPaginationInfo>>(
		selectorFn: (s: EstacionPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new EstacionPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class EstacionPaginationInfo extends $Base<'EstacionPaginationInfo'> {
	constructor() {
		super('EstacionPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Cursor connection for FDN.
 */
export class FDNCursorConnection extends $Base<'FDNCursorConnection'> {
	constructor() {
		super('FDNCursorConnection');
	}

	edges<Sel extends Selection<FDNEdge>>(
		selectorFn: (s: FDNEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FDNEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<FDNPageInfo>>(
		selectorFn: (s: FDNPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FDNPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of FDN.
 */
export class FDNEdge extends $Base<'FDNEdge'> {
	constructor() {
		super('FDNEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<FDN>>(
		selectorFn: (s: FDN) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FDN()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class FDN extends $Base<'FDN'> {
	constructor() {
		super('FDN');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}
}

/**
 * Information about the current page.
 */
export class FDNPageInfo extends $Base<'FDNPageInfo'> {
	constructor() {
		super('FDNPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for Factura.
 */
export class FacturaCursorConnection extends $Base<'FacturaCursorConnection'> {
	constructor() {
		super('FacturaCursorConnection');
	}

	edges<Sel extends Selection<FacturaEdge>>(
		selectorFn: (s: FacturaEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FacturaEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<FacturaPageInfo>>(
		selectorFn: (s: FacturaPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FacturaPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Factura.
 */
export class FacturaEdge extends $Base<'FacturaEdge'> {
	constructor() {
		super('FacturaEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Factura>>(
		selectorFn: (s: Factura) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Factura()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class Factura extends $Base<'Factura'> {
	constructor() {
		super('Factura');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	get dte(): $Field<'dte', string | null> {
		return this.$_select('dte') as any;
	}

	get fecha(): $Field<'fecha', string | null> {
		return this.$_select('fecha') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get serie(): $Field<'serie', string | null> {
		return this.$_select('serie') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}

	get uuid(): $Field<'uuid', string | null> {
		return this.$_select('uuid') as any;
	}

	venta<Sel extends Selection<Venta>>(
		selectorFn: (s: Venta) => [...Sel],
	): $Field<'venta', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Venta()),
		};
		return this.$_select('venta', options as any) as any;
	}
}

export class Venta extends $Base<'Venta'> {
	constructor() {
		super('Venta');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get createdAt(): $Field<'createdAt', string> {
		return this.$_select('createdAt') as any;
	}

	factura<Sel extends Selection<Factura>>(
		selectorFn: (s: Factura) => [...Sel],
	): $Field<'factura', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Factura()),
		};
		return this.$_select('factura', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	ida<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'ida', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('ida', options as any) as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get precio(): $Field<'precio', number | null> {
		return this.$_select('precio') as any;
	}

	regreso<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'regreso', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('regreso', options as any) as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get updatedAt(): $Field<'updatedAt', string> {
		return this.$_select('updatedAt') as any;
	}

	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class FacturaPageInfo extends $Base<'FacturaPageInfo'> {
	constructor() {
		super('FacturaPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

export type LocalidadFilter_order = {
	id?: string | null;
	nombre?: string | null;
};

/**
 * Page connection for Localidad.
 */
export class LocalidadPageConnection extends $Base<'LocalidadPageConnection'> {
	constructor() {
		super('LocalidadPageConnection');
	}

	collection<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<LocalidadPaginationInfo>>(
		selectorFn: (s: LocalidadPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new LocalidadPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class LocalidadPaginationInfo extends $Base<'LocalidadPaginationInfo'> {
	constructor() {
		super('LocalidadPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

export class Menu extends $Base<'Menu'> {
	constructor() {
		super('Menu');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	action<Sel extends Selection<Action>>(
		selectorFn: (s: Action) => [...Sel],
	): $Field<'action', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Action()),
		};
		return this.$_select('action', options as any) as any;
	}

	children<
		Args extends VariabledInput<{
			page?: number | null;
			itemsPerPage?: number | null;
			order?: Readonly<Array<MenuFilter_order | null>> | null;
			tipo?: string | null;
			tipo_list?: Readonly<Array<string | null>> | null;
		}>,
		Sel extends Selection<MenuPageConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				page?: number | null;
				itemsPerPage?: number | null;
				order?: Readonly<Array<MenuFilter_order | null>> | null;
				tipo?: string | null;
				tipo_list?: Readonly<Array<string | null>> | null;
			}
		>,
		selectorFn: (s: MenuPageConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	children<Sel extends Selection<MenuPageConnection>>(
		selectorFn: (s: MenuPageConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel>>;
	children(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				page: 'Int',
				itemsPerPage: 'Int',
				order: '[MenuFilter_order]',
				tipo: 'String',
				tipo_list: '[String]',
			},
			args,

			selection: selectorFn(new MenuPageConnection()),
		};
		return this.$_select('children', options as any) as any;
	}

	get icon(): $Field<'icon', string | null> {
		return this.$_select('icon') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	parent<Sel extends Selection<Menu>>(
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'parent', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Menu()),
		};
		return this.$_select('parent', options as any) as any;
	}

	get posicion(): $Field<'posicion', number | null> {
		return this.$_select('posicion') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}

	get tipo(): $Field<'tipo', string | null> {
		return this.$_select('tipo') as any;
	}
}

export type MenuFilter_order = {
	id?: string | null;
	nombre?: string | null;
	status?: string | null;
};

/**
 * Page connection for Menu.
 */
export class MenuPageConnection extends $Base<'MenuPageConnection'> {
	constructor() {
		super('MenuPageConnection');
	}

	collection<Sel extends Selection<Menu>>(
		selectorFn: (s: Menu) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Menu()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<MenuPaginationInfo>>(
		selectorFn: (s: MenuPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new MenuPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class MenuPaginationInfo extends $Base<'MenuPaginationInfo'> {
	constructor() {
		super('MenuPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Page connection for Nacion.
 */
export class NacionPageConnection extends $Base<'NacionPageConnection'> {
	constructor() {
		super('NacionPageConnection');
	}

	collection<Sel extends Selection<Nacion>>(
		selectorFn: (s: Nacion) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Nacion()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<NacionPaginationInfo>>(
		selectorFn: (s: NacionPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new NacionPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class NacionPaginationInfo extends $Base<'NacionPaginationInfo'> {
	constructor() {
		super('NacionPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Cursor connection for Parada.
 */
export class ParadaCursorConnection extends $Base<'ParadaCursorConnection'> {
	constructor() {
		super('ParadaCursorConnection');
	}

	edges<Sel extends Selection<ParadaEdge>>(
		selectorFn: (s: ParadaEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new ParadaEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<ParadaPageInfo>>(
		selectorFn: (s: ParadaPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new ParadaPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Parada.
 */
export class ParadaEdge extends $Base<'ParadaEdge'> {
	constructor() {
		super('ParadaEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Parada>>(
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Parada()),
		};
		return this.$_select('node', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class ParadaPageInfo extends $Base<'ParadaPageInfo'> {
	constructor() {
		super('ParadaPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

export type PilotoFilter_createdAt = {
	after?: string | null;
	before?: string | null;
	strictly_after?: string | null;
	strictly_before?: string | null;
};

export type PilotoFilter_order = {
	createdAt?: string | null;
	email?: string | null;
	id?: string | null;
	nombre?: string | null;
	status?: string | null;
};

/**
 * Page connection for Piloto.
 */
export class PilotoPageConnection extends $Base<'PilotoPageConnection'> {
	constructor() {
		super('PilotoPageConnection');
	}

	collection<Sel extends Selection<Piloto>>(
		selectorFn: (s: Piloto) => [...Sel],
	): $Field<
		'collection',
		Array<GetOutput<Sel> | null> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new Piloto()),
		};
		return this.$_select('collection', options as any) as any;
	}

	paginationInfo<Sel extends Selection<PilotoPaginationInfo>>(
		selectorFn: (s: PilotoPaginationInfo) => [...Sel],
	): $Field<'paginationInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new PilotoPaginationInfo()),
		};
		return this.$_select('paginationInfo', options as any) as any;
	}
}

/**
 * Information about the pagination.
 */
export class PilotoPaginationInfo extends $Base<'PilotoPaginationInfo'> {
	constructor() {
		super('PilotoPaginationInfo');
	}

	get currentPage(): $Field<'currentPage', number> {
		return this.$_select('currentPage') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get itemsPerPage(): $Field<'itemsPerPage', number> {
		return this.$_select('itemsPerPage') as any;
	}

	get lastPage(): $Field<'lastPage', number> {
		return this.$_select('lastPage') as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Cursor connection for RecorridoAsientoPrecio.
 */
export class RecorridoAsientoPrecioCursorConnection extends $Base<'RecorridoAsientoPrecioCursorConnection'> {
	constructor() {
		super('RecorridoAsientoPrecioCursorConnection');
	}

	edges<Sel extends Selection<RecorridoAsientoPrecioEdge>>(
		selectorFn: (s: RecorridoAsientoPrecioEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new RecorridoAsientoPrecioEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<RecorridoAsientoPrecioPageInfo>>(
		selectorFn: (s: RecorridoAsientoPrecioPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new RecorridoAsientoPrecioPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of RecorridoAsientoPrecio.
 */
export class RecorridoAsientoPrecioEdge extends $Base<'RecorridoAsientoPrecioEdge'> {
	constructor() {
		super('RecorridoAsientoPrecioEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<RecorridoAsientoPrecio>>(
		selectorFn: (s: RecorridoAsientoPrecio) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new RecorridoAsientoPrecio()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class RecorridoAsientoPrecio extends $Base<'RecorridoAsientoPrecio'> {
	constructor() {
		super('RecorridoAsientoPrecio');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get precioAsientoA(): $Field<'precioAsientoA', number | null> {
		return this.$_select('precioAsientoA') as any;
	}

	get precioAsientoB(): $Field<'precioAsientoB', number | null> {
		return this.$_select('precioAsientoB') as any;
	}

	recorrido<Sel extends Selection<Recorrido>>(
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'recorrido', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('recorrido', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class RecorridoAsientoPrecioPageInfo extends $Base<'RecorridoAsientoPrecioPageInfo'> {
	constructor() {
		super('RecorridoAsientoPrecioPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for Salida.
 */
export class SalidaCursorConnection extends $Base<'SalidaCursorConnection'> {
	constructor() {
		super('SalidaCursorConnection');
	}

	edges<Sel extends Selection<SalidaEdge>>(
		selectorFn: (s: SalidaEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<SalidaPageInfo>>(
		selectorFn: (s: SalidaPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Salida.
 */
export class SalidaEdge extends $Base<'SalidaEdge'> {
	constructor() {
		super('SalidaEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('node', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class SalidaPageInfo extends $Base<'SalidaPageInfo'> {
	constructor() {
		super('SalidaPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for Taxon.
 */
export class TaxonCursorConnection extends $Base<'TaxonCursorConnection'> {
	constructor() {
		super('TaxonCursorConnection');
	}

	edges<Sel extends Selection<TaxonEdge>>(
		selectorFn: (s: TaxonEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new TaxonEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<TaxonPageInfo>>(
		selectorFn: (s: TaxonPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new TaxonPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Taxon.
 */
export class TaxonEdge extends $Base<'TaxonEdge'> {
	constructor() {
		super('TaxonEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Taxon>>(
		selectorFn: (s: Taxon) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Taxon()),
		};
		return this.$_select('node', options as any) as any;
	}
}

export class Taxon extends $Base<'Taxon'> {
	constructor() {
		super('Taxon');
	}

	get _id(): $Field<'_id', number> {
		return this.$_select('_id') as any;
	}

	children<
		Args extends VariabledInput<{
			first?: number | null;
			last?: number | null;
			before?: string | null;
			after?: string | null;
		}>,
		Sel extends Selection<TaxonCursorConnection>,
	>(
		args: ExactArgNames<
			Args,
			{
				first?: number | null;
				last?: number | null;
				before?: string | null;
				after?: string | null;
			}
		>,
		selectorFn: (s: TaxonCursorConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel, Args>>;
	children<Sel extends Selection<TaxonCursorConnection>>(
		selectorFn: (s: TaxonCursorConnection) => [...Sel],
	): $Field<'children', GetOutput<Sel> | null, GetVariables<Sel>>;
	children(arg1: any, arg2?: any) {
		const { args, selectorFn } = !arg2
			? { args: {}, selectorFn: arg1 }
			: { args: arg1, selectorFn: arg2 };

		const options = {
			argTypes: {
				first: 'Int',
				last: 'Int',
				before: 'String',
				after: 'String',
			},
			args,

			selection: selectorFn(new TaxonCursorConnection()),
		};
		return this.$_select('children', options as any) as any;
	}

	get id(): $Field<'id', string> {
		return this.$_select('id') as any;
	}

	get label(): $Field<'label', string | null> {
		return this.$_select('label') as any;
	}

	get nombre(): $Field<'nombre', string | null> {
		return this.$_select('nombre') as any;
	}

	get nota(): $Field<'nota', string | null> {
		return this.$_select('nota') as any;
	}

	parent<Sel extends Selection<Taxon>>(
		selectorFn: (s: Taxon) => [...Sel],
	): $Field<'parent', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Taxon()),
		};
		return this.$_select('parent', options as any) as any;
	}

	get posicion(): $Field<'posicion', number | null> {
		return this.$_select('posicion') as any;
	}

	get status(): $Field<'status', Status | null> {
		return this.$_select('status') as any;
	}
}

/**
 * Information about the current page.
 */
export class TaxonPageInfo extends $Base<'TaxonPageInfo'> {
	constructor() {
		super('TaxonPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

/**
 * Cursor connection for Venta.
 */
export class VentaCursorConnection extends $Base<'VentaCursorConnection'> {
	constructor() {
		super('VentaCursorConnection');
	}

	edges<Sel extends Selection<VentaEdge>>(
		selectorFn: (s: VentaEdge) => [...Sel],
	): $Field<'edges', Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new VentaEdge()),
		};
		return this.$_select('edges', options as any) as any;
	}

	pageInfo<Sel extends Selection<VentaPageInfo>>(
		selectorFn: (s: VentaPageInfo) => [...Sel],
	): $Field<'pageInfo', GetOutput<Sel>, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new VentaPageInfo()),
		};
		return this.$_select('pageInfo', options as any) as any;
	}

	get totalCount(): $Field<'totalCount', number> {
		return this.$_select('totalCount') as any;
	}
}

/**
 * Edge of Venta.
 */
export class VentaEdge extends $Base<'VentaEdge'> {
	constructor() {
		super('VentaEdge');
	}

	get cursor(): $Field<'cursor', string> {
		return this.$_select('cursor') as any;
	}

	node<Sel extends Selection<Venta>>(
		selectorFn: (s: Venta) => [...Sel],
	): $Field<'node', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Venta()),
		};
		return this.$_select('node', options as any) as any;
	}
}

/**
 * Information about the current page.
 */
export class VentaPageInfo extends $Base<'VentaPageInfo'> {
	constructor() {
		super('VentaPageInfo');
	}

	get endCursor(): $Field<'endCursor', string | null> {
		return this.$_select('endCursor') as any;
	}

	get hasNextPage(): $Field<'hasNextPage', boolean> {
		return this.$_select('hasNextPage') as any;
	}

	get hasPreviousPage(): $Field<'hasPreviousPage', boolean> {
		return this.$_select('hasPreviousPage') as any;
	}

	get startCursor(): $Field<'startCursor', string | null> {
		return this.$_select('startCursor') as any;
	}
}

export class Mutation extends $Base<'Mutation'> {
	constructor() {
		super('Mutation');
	}

	/**
	 * Creates a Action.
	 */
	createAction<
		Args extends VariabledInput<{
			input: createActionInput;
		}>,
		Sel extends Selection<createActionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createActionInput;
			}
		>,
		selectorFn: (s: createActionPayload) => [...Sel],
	): $Field<'createAction', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createActionInput!',
			},
			args,

			selection: selectorFn(new createActionPayload()),
		};
		return this.$_select('createAction', options as any) as any;
	}

	/**
	 * Creates a Agencia.
	 */
	createAgencia<
		Args extends VariabledInput<{
			input: createAgenciaInput;
		}>,
		Sel extends Selection<createAgenciaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createAgenciaInput;
			}
		>,
		selectorFn: (s: createAgenciaPayload) => [...Sel],
	): $Field<'createAgencia', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createAgenciaInput!',
			},
			args,

			selection: selectorFn(new createAgenciaPayload()),
		};
		return this.$_select('createAgencia', options as any) as any;
	}

	/**
	 * Creates a Asiento.
	 */
	createAsiento<
		Args extends VariabledInput<{
			input: createAsientoInput;
		}>,
		Sel extends Selection<createAsientoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createAsientoInput;
			}
		>,
		selectorFn: (s: createAsientoPayload) => [...Sel],
	): $Field<'createAsiento', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createAsientoInput!',
			},
			args,

			selection: selectorFn(new createAsientoPayload()),
		};
		return this.$_select('createAsiento', options as any) as any;
	}

	/**
	 * Creates a Boleto.
	 */
	createBoleto<
		Args extends VariabledInput<{
			input: createBoletoInput;
		}>,
		Sel extends Selection<createBoletoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createBoletoInput;
			}
		>,
		selectorFn: (s: createBoletoPayload) => [...Sel],
	): $Field<'createBoleto', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createBoletoInput!',
			},
			args,

			selection: selectorFn(new createBoletoPayload()),
		};
		return this.$_select('createBoleto', options as any) as any;
	}

	/**
	 * Creates a BoletoLog.
	 */
	createBoletoLog<
		Args extends VariabledInput<{
			input: createBoletoLogInput;
		}>,
		Sel extends Selection<createBoletoLogPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createBoletoLogInput;
			}
		>,
		selectorFn: (s: createBoletoLogPayload) => [...Sel],
	): $Field<'createBoletoLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createBoletoLogInput!',
			},
			args,

			selection: selectorFn(new createBoletoLogPayload()),
		};
		return this.$_select('createBoletoLog', options as any) as any;
	}

	/**
	 * Creates a Cliente.
	 */
	createCliente<
		Args extends VariabledInput<{
			input: createClienteInput;
		}>,
		Sel extends Selection<createClientePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createClienteInput;
			}
		>,
		selectorFn: (s: createClientePayload) => [...Sel],
	): $Field<'createCliente', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createClienteInput!',
			},
			args,

			selection: selectorFn(new createClientePayload()),
		};
		return this.$_select('createCliente', options as any) as any;
	}

	/**
	 * Creates a Empresa.
	 */
	createEmpresa<
		Args extends VariabledInput<{
			input: createEmpresaInput;
		}>,
		Sel extends Selection<createEmpresaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createEmpresaInput;
			}
		>,
		selectorFn: (s: createEmpresaPayload) => [...Sel],
	): $Field<'createEmpresa', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createEmpresaInput!',
			},
			args,

			selection: selectorFn(new createEmpresaPayload()),
		};
		return this.$_select('createEmpresa', options as any) as any;
	}

	/**
	 * Creates a Enclave.
	 */
	createEnclave<
		Args extends VariabledInput<{
			input: createEnclaveInput;
		}>,
		Sel extends Selection<createEnclavePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createEnclaveInput;
			}
		>,
		selectorFn: (s: createEnclavePayload) => [...Sel],
	): $Field<'createEnclave', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createEnclaveInput!',
			},
			args,

			selection: selectorFn(new createEnclavePayload()),
		};
		return this.$_select('createEnclave', options as any) as any;
	}

	/**
	 * Creates a Estacion.
	 */
	createEstacion<
		Args extends VariabledInput<{
			input: createEstacionInput;
		}>,
		Sel extends Selection<createEstacionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createEstacionInput;
			}
		>,
		selectorFn: (s: createEstacionPayload) => [...Sel],
	): $Field<'createEstacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createEstacionInput!',
			},
			args,

			selection: selectorFn(new createEstacionPayload()),
		};
		return this.$_select('createEstacion', options as any) as any;
	}

	/**
	 * Creates a FDN.
	 */
	createFDN<
		Args extends VariabledInput<{
			input: createFDNInput;
		}>,
		Sel extends Selection<createFDNPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createFDNInput;
			}
		>,
		selectorFn: (s: createFDNPayload) => [...Sel],
	): $Field<'createFDN', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createFDNInput!',
			},
			args,

			selection: selectorFn(new createFDNPayload()),
		};
		return this.$_select('createFDN', options as any) as any;
	}

	/**
	 * Creates a Factura.
	 */
	createFactura<
		Args extends VariabledInput<{
			input: createFacturaInput;
		}>,
		Sel extends Selection<createFacturaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createFacturaInput;
			}
		>,
		selectorFn: (s: createFacturaPayload) => [...Sel],
	): $Field<'createFactura', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createFacturaInput!',
			},
			args,

			selection: selectorFn(new createFacturaPayload()),
		};
		return this.$_select('createFactura', options as any) as any;
	}

	/**
	 * Creates a Localidad.
	 */
	createLocalidad<
		Args extends VariabledInput<{
			input: createLocalidadInput;
		}>,
		Sel extends Selection<createLocalidadPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createLocalidadInput;
			}
		>,
		selectorFn: (s: createLocalidadPayload) => [...Sel],
	): $Field<'createLocalidad', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createLocalidadInput!',
			},
			args,

			selection: selectorFn(new createLocalidadPayload()),
		};
		return this.$_select('createLocalidad', options as any) as any;
	}

	/**
	 * Creates a Menu.
	 */
	createMenu<
		Args extends VariabledInput<{
			input: createMenuInput;
		}>,
		Sel extends Selection<createMenuPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createMenuInput;
			}
		>,
		selectorFn: (s: createMenuPayload) => [...Sel],
	): $Field<'createMenu', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createMenuInput!',
			},
			args,

			selection: selectorFn(new createMenuPayload()),
		};
		return this.$_select('createMenu', options as any) as any;
	}

	/**
	 * Creates a Nacion.
	 */
	createNacion<
		Args extends VariabledInput<{
			input: createNacionInput;
		}>,
		Sel extends Selection<createNacionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createNacionInput;
			}
		>,
		selectorFn: (s: createNacionPayload) => [...Sel],
	): $Field<'createNacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createNacionInput!',
			},
			args,

			selection: selectorFn(new createNacionPayload()),
		};
		return this.$_select('createNacion', options as any) as any;
	}

	/**
	 * Creates a Parada.
	 */
	createParada<
		Args extends VariabledInput<{
			input: createParadaInput;
		}>,
		Sel extends Selection<createParadaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createParadaInput;
			}
		>,
		selectorFn: (s: createParadaPayload) => [...Sel],
	): $Field<'createParada', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createParadaInput!',
			},
			args,

			selection: selectorFn(new createParadaPayload()),
		};
		return this.$_select('createParada', options as any) as any;
	}

	/**
	 * Creates a Permiso.
	 */
	createPermiso<
		Args extends VariabledInput<{
			input: createPermisoInput;
		}>,
		Sel extends Selection<createPermisoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createPermisoInput;
			}
		>,
		selectorFn: (s: createPermisoPayload) => [...Sel],
	): $Field<'createPermiso', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createPermisoInput!',
			},
			args,

			selection: selectorFn(new createPermisoPayload()),
		};
		return this.$_select('createPermiso', options as any) as any;
	}

	/**
	 * Creates a Recorrido.
	 */
	createRecorrido<
		Args extends VariabledInput<{
			input: createRecorridoInput;
		}>,
		Sel extends Selection<createRecorridoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createRecorridoInput;
			}
		>,
		selectorFn: (s: createRecorridoPayload) => [...Sel],
	): $Field<'createRecorrido', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createRecorridoInput!',
			},
			args,

			selection: selectorFn(new createRecorridoPayload()),
		};
		return this.$_select('createRecorrido', options as any) as any;
	}

	/**
	 * Creates a RecorridoAsientoPrecio.
	 */
	createRecorridoAsientoPrecio<
		Args extends VariabledInput<{
			input: createRecorridoAsientoPrecioInput;
		}>,
		Sel extends Selection<createRecorridoAsientoPrecioPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createRecorridoAsientoPrecioInput;
			}
		>,
		selectorFn: (s: createRecorridoAsientoPrecioPayload) => [...Sel],
	): $Field<
		'createRecorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	> {
		const options = {
			argTypes: {
				input: 'createRecorridoAsientoPrecioInput!',
			},
			args,

			selection: selectorFn(new createRecorridoAsientoPrecioPayload()),
		};
		return this.$_select('createRecorridoAsientoPrecio', options as any) as any;
	}

	/**
	 * Creates a Role.
	 */
	createRole<
		Args extends VariabledInput<{
			input: createRoleInput;
		}>,
		Sel extends Selection<createRolePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createRoleInput;
			}
		>,
		selectorFn: (s: createRolePayload) => [...Sel],
	): $Field<'createRole', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createRoleInput!',
			},
			args,

			selection: selectorFn(new createRolePayload()),
		};
		return this.$_select('createRole', options as any) as any;
	}

	/**
	 * Creates a Salida.
	 */
	createSalida<
		Args extends VariabledInput<{
			input: createSalidaInput;
		}>,
		Sel extends Selection<createSalidaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createSalidaInput;
			}
		>,
		selectorFn: (s: createSalidaPayload) => [...Sel],
	): $Field<'createSalida', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createSalidaInput!',
			},
			args,

			selection: selectorFn(new createSalidaPayload()),
		};
		return this.$_select('createSalida', options as any) as any;
	}

	/**
	 * Creates a SalidaLog.
	 */
	createSalidaLog<
		Args extends VariabledInput<{
			input: createSalidaLogInput;
		}>,
		Sel extends Selection<createSalidaLogPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createSalidaLogInput;
			}
		>,
		selectorFn: (s: createSalidaLogPayload) => [...Sel],
	): $Field<'createSalidaLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createSalidaLogInput!',
			},
			args,

			selection: selectorFn(new createSalidaLogPayload()),
		};
		return this.$_select('createSalidaLog', options as any) as any;
	}

	/**
	 * Creates a Taxon.
	 */
	createTaxon<
		Args extends VariabledInput<{
			input: createTaxonInput;
		}>,
		Sel extends Selection<createTaxonPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createTaxonInput;
			}
		>,
		selectorFn: (s: createTaxonPayload) => [...Sel],
	): $Field<'createTaxon', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createTaxonInput!',
			},
			args,

			selection: selectorFn(new createTaxonPayload()),
		};
		return this.$_select('createTaxon', options as any) as any;
	}

	/**
	 * Creates a User.
	 */
	createUser<
		Args extends VariabledInput<{
			input: createUserInput;
		}>,
		Sel extends Selection<createUserPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createUserInput;
			}
		>,
		selectorFn: (s: createUserPayload) => [...Sel],
	): $Field<'createUser', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createUserInput!',
			},
			args,

			selection: selectorFn(new createUserPayload()),
		};
		return this.$_select('createUser', options as any) as any;
	}

	/**
	 * Creates a Venta.
	 */
	createVenta<
		Args extends VariabledInput<{
			input: createVentaInput;
		}>,
		Sel extends Selection<createVentaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: createVentaInput;
			}
		>,
		selectorFn: (s: createVentaPayload) => [...Sel],
	): $Field<'createVenta', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'createVentaInput!',
			},
			args,

			selection: selectorFn(new createVentaPayload()),
		};
		return this.$_select('createVenta', options as any) as any;
	}

	/**
	 * Deletes a Action.
	 */
	deleteAction<
		Args extends VariabledInput<{
			input: deleteActionInput;
		}>,
		Sel extends Selection<deleteActionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteActionInput;
			}
		>,
		selectorFn: (s: deleteActionPayload) => [...Sel],
	): $Field<'deleteAction', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteActionInput!',
			},
			args,

			selection: selectorFn(new deleteActionPayload()),
		};
		return this.$_select('deleteAction', options as any) as any;
	}

	/**
	 * Deletes a Agencia.
	 */
	deleteAgencia<
		Args extends VariabledInput<{
			input: deleteAgenciaInput;
		}>,
		Sel extends Selection<deleteAgenciaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteAgenciaInput;
			}
		>,
		selectorFn: (s: deleteAgenciaPayload) => [...Sel],
	): $Field<'deleteAgencia', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteAgenciaInput!',
			},
			args,

			selection: selectorFn(new deleteAgenciaPayload()),
		};
		return this.$_select('deleteAgencia', options as any) as any;
	}

	/**
	 * Deletes a Agnostic.
	 */
	deleteAgnostic<
		Args extends VariabledInput<{
			input: deleteAgnosticInput;
		}>,
		Sel extends Selection<deleteAgnosticPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteAgnosticInput;
			}
		>,
		selectorFn: (s: deleteAgnosticPayload) => [...Sel],
	): $Field<'deleteAgnostic', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteAgnosticInput!',
			},
			args,

			selection: selectorFn(new deleteAgnosticPayload()),
		};
		return this.$_select('deleteAgnostic', options as any) as any;
	}

	/**
	 * Deletes a Asiento.
	 */
	deleteAsiento<
		Args extends VariabledInput<{
			input: deleteAsientoInput;
		}>,
		Sel extends Selection<deleteAsientoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteAsientoInput;
			}
		>,
		selectorFn: (s: deleteAsientoPayload) => [...Sel],
	): $Field<'deleteAsiento', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteAsientoInput!',
			},
			args,

			selection: selectorFn(new deleteAsientoPayload()),
		};
		return this.$_select('deleteAsiento', options as any) as any;
	}

	/**
	 * Deletes a Boleto.
	 */
	deleteBoleto<
		Args extends VariabledInput<{
			input: deleteBoletoInput;
		}>,
		Sel extends Selection<deleteBoletoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteBoletoInput;
			}
		>,
		selectorFn: (s: deleteBoletoPayload) => [...Sel],
	): $Field<'deleteBoleto', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteBoletoInput!',
			},
			args,

			selection: selectorFn(new deleteBoletoPayload()),
		};
		return this.$_select('deleteBoleto', options as any) as any;
	}

	/**
	 * Deletes a BoletoLog.
	 */
	deleteBoletoLog<
		Args extends VariabledInput<{
			input: deleteBoletoLogInput;
		}>,
		Sel extends Selection<deleteBoletoLogPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteBoletoLogInput;
			}
		>,
		selectorFn: (s: deleteBoletoLogPayload) => [...Sel],
	): $Field<'deleteBoletoLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteBoletoLogInput!',
			},
			args,

			selection: selectorFn(new deleteBoletoLogPayload()),
		};
		return this.$_select('deleteBoletoLog', options as any) as any;
	}

	/**
	 * Deletes a Cliente.
	 */
	deleteCliente<
		Args extends VariabledInput<{
			input: deleteClienteInput;
		}>,
		Sel extends Selection<deleteClientePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteClienteInput;
			}
		>,
		selectorFn: (s: deleteClientePayload) => [...Sel],
	): $Field<'deleteCliente', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteClienteInput!',
			},
			args,

			selection: selectorFn(new deleteClientePayload()),
		};
		return this.$_select('deleteCliente', options as any) as any;
	}

	/**
	 * Deletes a Empresa.
	 */
	deleteEmpresa<
		Args extends VariabledInput<{
			input: deleteEmpresaInput;
		}>,
		Sel extends Selection<deleteEmpresaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteEmpresaInput;
			}
		>,
		selectorFn: (s: deleteEmpresaPayload) => [...Sel],
	): $Field<'deleteEmpresa', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteEmpresaInput!',
			},
			args,

			selection: selectorFn(new deleteEmpresaPayload()),
		};
		return this.$_select('deleteEmpresa', options as any) as any;
	}

	/**
	 * Deletes a Enclave.
	 */
	deleteEnclave<
		Args extends VariabledInput<{
			input: deleteEnclaveInput;
		}>,
		Sel extends Selection<deleteEnclavePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteEnclaveInput;
			}
		>,
		selectorFn: (s: deleteEnclavePayload) => [...Sel],
	): $Field<'deleteEnclave', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteEnclaveInput!',
			},
			args,

			selection: selectorFn(new deleteEnclavePayload()),
		};
		return this.$_select('deleteEnclave', options as any) as any;
	}

	/**
	 * Deletes a Estacion.
	 */
	deleteEstacion<
		Args extends VariabledInput<{
			input: deleteEstacionInput;
		}>,
		Sel extends Selection<deleteEstacionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteEstacionInput;
			}
		>,
		selectorFn: (s: deleteEstacionPayload) => [...Sel],
	): $Field<'deleteEstacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteEstacionInput!',
			},
			args,

			selection: selectorFn(new deleteEstacionPayload()),
		};
		return this.$_select('deleteEstacion', options as any) as any;
	}

	/**
	 * Deletes a FDN.
	 */
	deleteFDN<
		Args extends VariabledInput<{
			input: deleteFDNInput;
		}>,
		Sel extends Selection<deleteFDNPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteFDNInput;
			}
		>,
		selectorFn: (s: deleteFDNPayload) => [...Sel],
	): $Field<'deleteFDN', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteFDNInput!',
			},
			args,

			selection: selectorFn(new deleteFDNPayload()),
		};
		return this.$_select('deleteFDN', options as any) as any;
	}

	/**
	 * Deletes a Factura.
	 */
	deleteFactura<
		Args extends VariabledInput<{
			input: deleteFacturaInput;
		}>,
		Sel extends Selection<deleteFacturaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteFacturaInput;
			}
		>,
		selectorFn: (s: deleteFacturaPayload) => [...Sel],
	): $Field<'deleteFactura', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteFacturaInput!',
			},
			args,

			selection: selectorFn(new deleteFacturaPayload()),
		};
		return this.$_select('deleteFactura', options as any) as any;
	}

	/**
	 * Deletes a Localidad.
	 */
	deleteLocalidad<
		Args extends VariabledInput<{
			input: deleteLocalidadInput;
		}>,
		Sel extends Selection<deleteLocalidadPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteLocalidadInput;
			}
		>,
		selectorFn: (s: deleteLocalidadPayload) => [...Sel],
	): $Field<'deleteLocalidad', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteLocalidadInput!',
			},
			args,

			selection: selectorFn(new deleteLocalidadPayload()),
		};
		return this.$_select('deleteLocalidad', options as any) as any;
	}

	/**
	 * Deletes a Menu.
	 */
	deleteMenu<
		Args extends VariabledInput<{
			input: deleteMenuInput;
		}>,
		Sel extends Selection<deleteMenuPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteMenuInput;
			}
		>,
		selectorFn: (s: deleteMenuPayload) => [...Sel],
	): $Field<'deleteMenu', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteMenuInput!',
			},
			args,

			selection: selectorFn(new deleteMenuPayload()),
		};
		return this.$_select('deleteMenu', options as any) as any;
	}

	/**
	 * Deletes a Nacion.
	 */
	deleteNacion<
		Args extends VariabledInput<{
			input: deleteNacionInput;
		}>,
		Sel extends Selection<deleteNacionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteNacionInput;
			}
		>,
		selectorFn: (s: deleteNacionPayload) => [...Sel],
	): $Field<'deleteNacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteNacionInput!',
			},
			args,

			selection: selectorFn(new deleteNacionPayload()),
		};
		return this.$_select('deleteNacion', options as any) as any;
	}

	/**
	 * Deletes a Parada.
	 */
	deleteParada<
		Args extends VariabledInput<{
			input: deleteParadaInput;
		}>,
		Sel extends Selection<deleteParadaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteParadaInput;
			}
		>,
		selectorFn: (s: deleteParadaPayload) => [...Sel],
	): $Field<'deleteParada', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteParadaInput!',
			},
			args,

			selection: selectorFn(new deleteParadaPayload()),
		};
		return this.$_select('deleteParada', options as any) as any;
	}

	/**
	 * Deletes a Permiso.
	 */
	deletePermiso<
		Args extends VariabledInput<{
			input: deletePermisoInput;
		}>,
		Sel extends Selection<deletePermisoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deletePermisoInput;
			}
		>,
		selectorFn: (s: deletePermisoPayload) => [...Sel],
	): $Field<'deletePermiso', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deletePermisoInput!',
			},
			args,

			selection: selectorFn(new deletePermisoPayload()),
		};
		return this.$_select('deletePermiso', options as any) as any;
	}

	/**
	 * Deletes a Recorrido.
	 */
	deleteRecorrido<
		Args extends VariabledInput<{
			input: deleteRecorridoInput;
		}>,
		Sel extends Selection<deleteRecorridoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteRecorridoInput;
			}
		>,
		selectorFn: (s: deleteRecorridoPayload) => [...Sel],
	): $Field<'deleteRecorrido', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteRecorridoInput!',
			},
			args,

			selection: selectorFn(new deleteRecorridoPayload()),
		};
		return this.$_select('deleteRecorrido', options as any) as any;
	}

	/**
	 * Deletes a RecorridoAsientoPrecio.
	 */
	deleteRecorridoAsientoPrecio<
		Args extends VariabledInput<{
			input: deleteRecorridoAsientoPrecioInput;
		}>,
		Sel extends Selection<deleteRecorridoAsientoPrecioPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteRecorridoAsientoPrecioInput;
			}
		>,
		selectorFn: (s: deleteRecorridoAsientoPrecioPayload) => [...Sel],
	): $Field<
		'deleteRecorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	> {
		const options = {
			argTypes: {
				input: 'deleteRecorridoAsientoPrecioInput!',
			},
			args,

			selection: selectorFn(new deleteRecorridoAsientoPrecioPayload()),
		};
		return this.$_select('deleteRecorridoAsientoPrecio', options as any) as any;
	}

	/**
	 * Deletes a Role.
	 */
	deleteRole<
		Args extends VariabledInput<{
			input: deleteRoleInput;
		}>,
		Sel extends Selection<deleteRolePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteRoleInput;
			}
		>,
		selectorFn: (s: deleteRolePayload) => [...Sel],
	): $Field<'deleteRole', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteRoleInput!',
			},
			args,

			selection: selectorFn(new deleteRolePayload()),
		};
		return this.$_select('deleteRole', options as any) as any;
	}

	/**
	 * Deletes a Salida.
	 */
	deleteSalida<
		Args extends VariabledInput<{
			input: deleteSalidaInput;
		}>,
		Sel extends Selection<deleteSalidaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteSalidaInput;
			}
		>,
		selectorFn: (s: deleteSalidaPayload) => [...Sel],
	): $Field<'deleteSalida', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteSalidaInput!',
			},
			args,

			selection: selectorFn(new deleteSalidaPayload()),
		};
		return this.$_select('deleteSalida', options as any) as any;
	}

	/**
	 * Deletes a SalidaLog.
	 */
	deleteSalidaLog<
		Args extends VariabledInput<{
			input: deleteSalidaLogInput;
		}>,
		Sel extends Selection<deleteSalidaLogPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteSalidaLogInput;
			}
		>,
		selectorFn: (s: deleteSalidaLogPayload) => [...Sel],
	): $Field<'deleteSalidaLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteSalidaLogInput!',
			},
			args,

			selection: selectorFn(new deleteSalidaLogPayload()),
		};
		return this.$_select('deleteSalidaLog', options as any) as any;
	}

	/**
	 * Deletes a Taxon.
	 */
	deleteTaxon<
		Args extends VariabledInput<{
			input: deleteTaxonInput;
		}>,
		Sel extends Selection<deleteTaxonPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteTaxonInput;
			}
		>,
		selectorFn: (s: deleteTaxonPayload) => [...Sel],
	): $Field<'deleteTaxon', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteTaxonInput!',
			},
			args,

			selection: selectorFn(new deleteTaxonPayload()),
		};
		return this.$_select('deleteTaxon', options as any) as any;
	}

	/**
	 * Deletes a User.
	 */
	deleteUser<
		Args extends VariabledInput<{
			input: deleteUserInput;
		}>,
		Sel extends Selection<deleteUserPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteUserInput;
			}
		>,
		selectorFn: (s: deleteUserPayload) => [...Sel],
	): $Field<'deleteUser', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteUserInput!',
			},
			args,

			selection: selectorFn(new deleteUserPayload()),
		};
		return this.$_select('deleteUser', options as any) as any;
	}

	/**
	 * Deletes a Venta.
	 */
	deleteVenta<
		Args extends VariabledInput<{
			input: deleteVentaInput;
		}>,
		Sel extends Selection<deleteVentaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: deleteVentaInput;
			}
		>,
		selectorFn: (s: deleteVentaPayload) => [...Sel],
	): $Field<'deleteVenta', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'deleteVentaInput!',
			},
			args,

			selection: selectorFn(new deleteVentaPayload()),
		};
		return this.$_select('deleteVenta', options as any) as any;
	}

	/**
	 * Updates a Action.
	 */
	updateAction<
		Args extends VariabledInput<{
			input: updateActionInput;
		}>,
		Sel extends Selection<updateActionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateActionInput;
			}
		>,
		selectorFn: (s: updateActionPayload) => [...Sel],
	): $Field<'updateAction', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateActionInput!',
			},
			args,

			selection: selectorFn(new updateActionPayload()),
		};
		return this.$_select('updateAction', options as any) as any;
	}

	/**
	 * Updates a Agencia.
	 */
	updateAgencia<
		Args extends VariabledInput<{
			input: updateAgenciaInput;
		}>,
		Sel extends Selection<updateAgenciaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateAgenciaInput;
			}
		>,
		selectorFn: (s: updateAgenciaPayload) => [...Sel],
	): $Field<'updateAgencia', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateAgenciaInput!',
			},
			args,

			selection: selectorFn(new updateAgenciaPayload()),
		};
		return this.$_select('updateAgencia', options as any) as any;
	}

	/**
	 * Updates a Asiento.
	 */
	updateAsiento<
		Args extends VariabledInput<{
			input: updateAsientoInput;
		}>,
		Sel extends Selection<updateAsientoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateAsientoInput;
			}
		>,
		selectorFn: (s: updateAsientoPayload) => [...Sel],
	): $Field<'updateAsiento', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateAsientoInput!',
			},
			args,

			selection: selectorFn(new updateAsientoPayload()),
		};
		return this.$_select('updateAsiento', options as any) as any;
	}

	/**
	 * Updates a Boleto.
	 */
	updateBoleto<
		Args extends VariabledInput<{
			input: updateBoletoInput;
		}>,
		Sel extends Selection<updateBoletoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateBoletoInput;
			}
		>,
		selectorFn: (s: updateBoletoPayload) => [...Sel],
	): $Field<'updateBoleto', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateBoletoInput!',
			},
			args,

			selection: selectorFn(new updateBoletoPayload()),
		};
		return this.$_select('updateBoleto', options as any) as any;
	}

	/**
	 * Updates a BoletoLog.
	 */
	updateBoletoLog<
		Args extends VariabledInput<{
			input: updateBoletoLogInput;
		}>,
		Sel extends Selection<updateBoletoLogPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateBoletoLogInput;
			}
		>,
		selectorFn: (s: updateBoletoLogPayload) => [...Sel],
	): $Field<'updateBoletoLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateBoletoLogInput!',
			},
			args,

			selection: selectorFn(new updateBoletoLogPayload()),
		};
		return this.$_select('updateBoletoLog', options as any) as any;
	}

	/**
	 * Updates a Cliente.
	 */
	updateCliente<
		Args extends VariabledInput<{
			input: updateClienteInput;
		}>,
		Sel extends Selection<updateClientePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateClienteInput;
			}
		>,
		selectorFn: (s: updateClientePayload) => [...Sel],
	): $Field<'updateCliente', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateClienteInput!',
			},
			args,

			selection: selectorFn(new updateClientePayload()),
		};
		return this.$_select('updateCliente', options as any) as any;
	}

	/**
	 * Updates a Empresa.
	 */
	updateEmpresa<
		Args extends VariabledInput<{
			input: updateEmpresaInput;
		}>,
		Sel extends Selection<updateEmpresaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateEmpresaInput;
			}
		>,
		selectorFn: (s: updateEmpresaPayload) => [...Sel],
	): $Field<'updateEmpresa', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateEmpresaInput!',
			},
			args,

			selection: selectorFn(new updateEmpresaPayload()),
		};
		return this.$_select('updateEmpresa', options as any) as any;
	}

	/**
	 * Updates a Enclave.
	 */
	updateEnclave<
		Args extends VariabledInput<{
			input: updateEnclaveInput;
		}>,
		Sel extends Selection<updateEnclavePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateEnclaveInput;
			}
		>,
		selectorFn: (s: updateEnclavePayload) => [...Sel],
	): $Field<'updateEnclave', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateEnclaveInput!',
			},
			args,

			selection: selectorFn(new updateEnclavePayload()),
		};
		return this.$_select('updateEnclave', options as any) as any;
	}

	/**
	 * Updates a Estacion.
	 */
	updateEstacion<
		Args extends VariabledInput<{
			input: updateEstacionInput;
		}>,
		Sel extends Selection<updateEstacionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateEstacionInput;
			}
		>,
		selectorFn: (s: updateEstacionPayload) => [...Sel],
	): $Field<'updateEstacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateEstacionInput!',
			},
			args,

			selection: selectorFn(new updateEstacionPayload()),
		};
		return this.$_select('updateEstacion', options as any) as any;
	}

	/**
	 * Updates a FDN.
	 */
	updateFDN<
		Args extends VariabledInput<{
			input: updateFDNInput;
		}>,
		Sel extends Selection<updateFDNPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateFDNInput;
			}
		>,
		selectorFn: (s: updateFDNPayload) => [...Sel],
	): $Field<'updateFDN', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateFDNInput!',
			},
			args,

			selection: selectorFn(new updateFDNPayload()),
		};
		return this.$_select('updateFDN', options as any) as any;
	}

	/**
	 * Updates a Factura.
	 */
	updateFactura<
		Args extends VariabledInput<{
			input: updateFacturaInput;
		}>,
		Sel extends Selection<updateFacturaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateFacturaInput;
			}
		>,
		selectorFn: (s: updateFacturaPayload) => [...Sel],
	): $Field<'updateFactura', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateFacturaInput!',
			},
			args,

			selection: selectorFn(new updateFacturaPayload()),
		};
		return this.$_select('updateFactura', options as any) as any;
	}

	/**
	 * Updates a Localidad.
	 */
	updateLocalidad<
		Args extends VariabledInput<{
			input: updateLocalidadInput;
		}>,
		Sel extends Selection<updateLocalidadPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateLocalidadInput;
			}
		>,
		selectorFn: (s: updateLocalidadPayload) => [...Sel],
	): $Field<'updateLocalidad', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateLocalidadInput!',
			},
			args,

			selection: selectorFn(new updateLocalidadPayload()),
		};
		return this.$_select('updateLocalidad', options as any) as any;
	}

	/**
	 * Updates a Menu.
	 */
	updateMenu<
		Args extends VariabledInput<{
			input: updateMenuInput;
		}>,
		Sel extends Selection<updateMenuPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateMenuInput;
			}
		>,
		selectorFn: (s: updateMenuPayload) => [...Sel],
	): $Field<'updateMenu', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateMenuInput!',
			},
			args,

			selection: selectorFn(new updateMenuPayload()),
		};
		return this.$_select('updateMenu', options as any) as any;
	}

	/**
	 * Updates a Nacion.
	 */
	updateNacion<
		Args extends VariabledInput<{
			input: updateNacionInput;
		}>,
		Sel extends Selection<updateNacionPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateNacionInput;
			}
		>,
		selectorFn: (s: updateNacionPayload) => [...Sel],
	): $Field<'updateNacion', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateNacionInput!',
			},
			args,

			selection: selectorFn(new updateNacionPayload()),
		};
		return this.$_select('updateNacion', options as any) as any;
	}

	/**
	 * Updates a Parada.
	 */
	updateParada<
		Args extends VariabledInput<{
			input: updateParadaInput;
		}>,
		Sel extends Selection<updateParadaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateParadaInput;
			}
		>,
		selectorFn: (s: updateParadaPayload) => [...Sel],
	): $Field<'updateParada', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateParadaInput!',
			},
			args,

			selection: selectorFn(new updateParadaPayload()),
		};
		return this.$_select('updateParada', options as any) as any;
	}

	/**
	 * Updates a Permiso.
	 */
	updatePermiso<
		Args extends VariabledInput<{
			input: updatePermisoInput;
		}>,
		Sel extends Selection<updatePermisoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updatePermisoInput;
			}
		>,
		selectorFn: (s: updatePermisoPayload) => [...Sel],
	): $Field<'updatePermiso', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updatePermisoInput!',
			},
			args,

			selection: selectorFn(new updatePermisoPayload()),
		};
		return this.$_select('updatePermiso', options as any) as any;
	}

	/**
	 * Updates a Recorrido.
	 */
	updateRecorrido<
		Args extends VariabledInput<{
			input: updateRecorridoInput;
		}>,
		Sel extends Selection<updateRecorridoPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateRecorridoInput;
			}
		>,
		selectorFn: (s: updateRecorridoPayload) => [...Sel],
	): $Field<'updateRecorrido', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateRecorridoInput!',
			},
			args,

			selection: selectorFn(new updateRecorridoPayload()),
		};
		return this.$_select('updateRecorrido', options as any) as any;
	}

	/**
	 * Updates a RecorridoAsientoPrecio.
	 */
	updateRecorridoAsientoPrecio<
		Args extends VariabledInput<{
			input: updateRecorridoAsientoPrecioInput;
		}>,
		Sel extends Selection<updateRecorridoAsientoPrecioPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateRecorridoAsientoPrecioInput;
			}
		>,
		selectorFn: (s: updateRecorridoAsientoPrecioPayload) => [...Sel],
	): $Field<
		'updateRecorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel, Args>
	> {
		const options = {
			argTypes: {
				input: 'updateRecorridoAsientoPrecioInput!',
			},
			args,

			selection: selectorFn(new updateRecorridoAsientoPrecioPayload()),
		};
		return this.$_select('updateRecorridoAsientoPrecio', options as any) as any;
	}

	/**
	 * Updates a Role.
	 */
	updateRole<
		Args extends VariabledInput<{
			input: updateRoleInput;
		}>,
		Sel extends Selection<updateRolePayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateRoleInput;
			}
		>,
		selectorFn: (s: updateRolePayload) => [...Sel],
	): $Field<'updateRole', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateRoleInput!',
			},
			args,

			selection: selectorFn(new updateRolePayload()),
		};
		return this.$_select('updateRole', options as any) as any;
	}

	/**
	 * Updates a Salida.
	 */
	updateSalida<
		Args extends VariabledInput<{
			input: updateSalidaInput;
		}>,
		Sel extends Selection<updateSalidaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateSalidaInput;
			}
		>,
		selectorFn: (s: updateSalidaPayload) => [...Sel],
	): $Field<'updateSalida', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateSalidaInput!',
			},
			args,

			selection: selectorFn(new updateSalidaPayload()),
		};
		return this.$_select('updateSalida', options as any) as any;
	}

	/**
	 * Updates a SalidaLog.
	 */
	updateSalidaLog<
		Args extends VariabledInput<{
			input: updateSalidaLogInput;
		}>,
		Sel extends Selection<updateSalidaLogPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateSalidaLogInput;
			}
		>,
		selectorFn: (s: updateSalidaLogPayload) => [...Sel],
	): $Field<'updateSalidaLog', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateSalidaLogInput!',
			},
			args,

			selection: selectorFn(new updateSalidaLogPayload()),
		};
		return this.$_select('updateSalidaLog', options as any) as any;
	}

	/**
	 * Updates a Taxon.
	 */
	updateTaxon<
		Args extends VariabledInput<{
			input: updateTaxonInput;
		}>,
		Sel extends Selection<updateTaxonPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateTaxonInput;
			}
		>,
		selectorFn: (s: updateTaxonPayload) => [...Sel],
	): $Field<'updateTaxon', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateTaxonInput!',
			},
			args,

			selection: selectorFn(new updateTaxonPayload()),
		};
		return this.$_select('updateTaxon', options as any) as any;
	}

	/**
	 * Updates a User.
	 */
	updateUser<
		Args extends VariabledInput<{
			input: updateUserInput;
		}>,
		Sel extends Selection<updateUserPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateUserInput;
			}
		>,
		selectorFn: (s: updateUserPayload) => [...Sel],
	): $Field<'updateUser', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateUserInput!',
			},
			args,

			selection: selectorFn(new updateUserPayload()),
		};
		return this.$_select('updateUser', options as any) as any;
	}

	/**
	 * Updates a Venta.
	 */
	updateVenta<
		Args extends VariabledInput<{
			input: updateVentaInput;
		}>,
		Sel extends Selection<updateVentaPayload>,
	>(
		args: ExactArgNames<
			Args,
			{
				input: updateVentaInput;
			}
		>,
		selectorFn: (s: updateVentaPayload) => [...Sel],
	): $Field<'updateVenta', GetOutput<Sel> | null, GetVariables<Sel, Args>> {
		const options = {
			argTypes: {
				input: 'updateVentaInput!',
			},
			args,

			selection: selectorFn(new updateVentaPayload()),
		};
		return this.$_select('updateVenta', options as any) as any;
	}
}

/**
 * Deletes a Agnostic.
 */
export type deleteAgnosticInput = {
	clientMutationId?: string | null;
	ids?: Readonly<Array<string | null>> | null;
	resource?: string | null;
};

/**
 * Deletes a Agnostic.
 */
export class deleteAgnosticPayload extends $Base<'deleteAgnosticPayload'> {
	constructor() {
		super('deleteAgnosticPayload');
	}

	agnostic<Sel extends Selection<Agnostic>>(
		selectorFn: (s: Agnostic) => [...Sel],
	): $Field<'agnostic', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Agnostic()),
		};
		return this.$_select('agnostic', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Creates a Action.
 */
export type createActionInput = {
	clientMutationId?: string | null;
	nombre?: string | null;
	roles?: Readonly<Array<string | null>> | null;
	ruta?: string | null;
	status?: Status | null;
};

/**
 * Creates a Action.
 */
export class createActionPayload extends $Base<'createActionPayload'> {
	constructor() {
		super('createActionPayload');
	}

	action<Sel extends Selection<Action>>(
		selectorFn: (s: Action) => [...Sel],
	): $Field<'action', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Action()),
		};
		return this.$_select('action', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Updates a Action.
 */
export type updateActionInput = {
	clientMutationId?: string | null;
	id: string;
	nombre?: string | null;
	roles?: Readonly<Array<string | null>> | null;
	ruta?: string | null;
	status?: Status | null;
};

/**
 * Updates a Action.
 */
export class updateActionPayload extends $Base<'updateActionPayload'> {
	constructor() {
		super('updateActionPayload');
	}

	action<Sel extends Selection<Action>>(
		selectorFn: (s: Action) => [...Sel],
	): $Field<'action', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Action()),
		};
		return this.$_select('action', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Deletes a Action.
 */
export type deleteActionInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Action.
 */
export class deleteActionPayload extends $Base<'deleteActionPayload'> {
	constructor() {
		super('deleteActionPayload');
	}

	action<Sel extends Selection<Action>>(
		selectorFn: (s: Action) => [...Sel],
	): $Field<'action', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Action()),
		};
		return this.$_select('action', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Updates a Agencia.
 */
export type updateAgenciaInput = {
	alias?: string | null;
	clientMutationId?: string | null;
	direccion?: string | null;
	email?: string | null;
	id: string;
	legacyId?: number | null;
	localidad?: string | null;
	nombre?: string | null;
	nota?: string | null;
	status?: Status | null;
	telefono?: string | null;
	users?: Readonly<Array<string | null>> | null;
};

/**
 * Updates a Agencia.
 */
export class updateAgenciaPayload extends $Base<'updateAgenciaPayload'> {
	constructor() {
		super('updateAgenciaPayload');
	}

	agencia<Sel extends Selection<Agencia>>(
		selectorFn: (s: Agencia) => [...Sel],
	): $Field<'agencia', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Agencia()),
		};
		return this.$_select('agencia', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Deletes a Agencia.
 */
export type deleteAgenciaInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Agencia.
 */
export class deleteAgenciaPayload extends $Base<'deleteAgenciaPayload'> {
	constructor() {
		super('deleteAgenciaPayload');
	}

	agencia<Sel extends Selection<Agencia>>(
		selectorFn: (s: Agencia) => [...Sel],
	): $Field<'agencia', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Agencia()),
		};
		return this.$_select('agencia', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Creates a Agencia.
 */
export type createAgenciaInput = {
	alias: string;
	clientMutationId?: string | null;
	direccion?: string | null;
	email?: string | null;
	legacyId?: number | null;
	localidad?: string | null;
	nombre?: string | null;
	nota?: string | null;
	status?: Status | null;
	telefono?: string | null;
	users?: Readonly<Array<string | null>> | null;
};

/**
 * Creates a Agencia.
 */
export class createAgenciaPayload extends $Base<'createAgenciaPayload'> {
	constructor() {
		super('createAgenciaPayload');
	}

	agencia<Sel extends Selection<Agencia>>(
		selectorFn: (s: Agencia) => [...Sel],
	): $Field<'agencia', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Agencia()),
		};
		return this.$_select('agencia', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Updates a Asiento.
 */
export type updateAsientoInput = {
	bus?: string | null;
	clase?: string | null;
	clientMutationId?: string | null;
	id: string;
	numero?: number | null;
};

/**
 * Updates a Asiento.
 */
export class updateAsientoPayload extends $Base<'updateAsientoPayload'> {
	constructor() {
		super('updateAsientoPayload');
	}

	asiento<Sel extends Selection<Asiento>>(
		selectorFn: (s: Asiento) => [...Sel],
	): $Field<'asiento', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Asiento()),
		};
		return this.$_select('asiento', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Deletes a Asiento.
 */
export type deleteAsientoInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Asiento.
 */
export class deleteAsientoPayload extends $Base<'deleteAsientoPayload'> {
	constructor() {
		super('deleteAsientoPayload');
	}

	asiento<Sel extends Selection<Asiento>>(
		selectorFn: (s: Asiento) => [...Sel],
	): $Field<'asiento', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Asiento()),
		};
		return this.$_select('asiento', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Creates a Asiento.
 */
export type createAsientoInput = {
	bus: string;
	clase?: string | null;
	clientMutationId?: string | null;
	numero: number;
};

/**
 * Creates a Asiento.
 */
export class createAsientoPayload extends $Base<'createAsientoPayload'> {
	constructor() {
		super('createAsientoPayload');
	}

	asiento<Sel extends Selection<Asiento>>(
		selectorFn: (s: Asiento) => [...Sel],
	): $Field<'asiento', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Asiento()),
		};
		return this.$_select('asiento', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Updates a Boleto.
 */
export type updateBoletoInput = {
	asiento?: string | null;
	boletoLogs?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	cliente?: string | null;
	createdAt?: string | null;
	id: string;
	precio?: number | null;
	salida?: string | null;
	status?: Status | null;
	updatedAt?: string | null;
};

/**
 * Updates a Boleto.
 */
export class updateBoletoPayload extends $Base<'updateBoletoPayload'> {
	constructor() {
		super('updateBoletoPayload');
	}

	boleto<Sel extends Selection<Boleto>>(
		selectorFn: (s: Boleto) => [...Sel],
	): $Field<'boleto', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Boleto()),
		};
		return this.$_select('boleto', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Deletes a Boleto.
 */
export type deleteBoletoInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Boleto.
 */
export class deleteBoletoPayload extends $Base<'deleteBoletoPayload'> {
	constructor() {
		super('deleteBoletoPayload');
	}

	boleto<Sel extends Selection<Boleto>>(
		selectorFn: (s: Boleto) => [...Sel],
	): $Field<'boleto', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Boleto()),
		};
		return this.$_select('boleto', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Creates a Boleto.
 */
export type createBoletoInput = {
	asiento: string;
	boletoLogs?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	cliente: string;
	createdAt: string;
	precio?: number | null;
	salida: string;
	status?: Status | null;
	updatedAt: string;
};

/**
 * Creates a Boleto.
 */
export class createBoletoPayload extends $Base<'createBoletoPayload'> {
	constructor() {
		super('createBoletoPayload');
	}

	boleto<Sel extends Selection<Boleto>>(
		selectorFn: (s: Boleto) => [...Sel],
	): $Field<'boleto', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Boleto()),
		};
		return this.$_select('boleto', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Updates a BoletoLog.
 */
export type updateBoletoLogInput = {
	boleto?: string | null;
	clientMutationId?: string | null;
	createdAt?: string | null;
	descripcion?: string | null;
	id: string;
	tipo?: number | null;
	updatedAt?: string | null;
	user?: string | null;
};

/**
 * Updates a BoletoLog.
 */
export class updateBoletoLogPayload extends $Base<'updateBoletoLogPayload'> {
	constructor() {
		super('updateBoletoLogPayload');
	}

	boletoLog<Sel extends Selection<BoletoLog>>(
		selectorFn: (s: BoletoLog) => [...Sel],
	): $Field<'boletoLog', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoLog()),
		};
		return this.$_select('boletoLog', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Deletes a BoletoLog.
 */
export type deleteBoletoLogInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a BoletoLog.
 */
export class deleteBoletoLogPayload extends $Base<'deleteBoletoLogPayload'> {
	constructor() {
		super('deleteBoletoLogPayload');
	}

	boletoLog<Sel extends Selection<BoletoLog>>(
		selectorFn: (s: BoletoLog) => [...Sel],
	): $Field<'boletoLog', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoLog()),
		};
		return this.$_select('boletoLog', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Creates a BoletoLog.
 */
export type createBoletoLogInput = {
	boleto: string;
	clientMutationId?: string | null;
	createdAt: string;
	descripcion?: string | null;
	tipo?: number | null;
	updatedAt: string;
	user?: string | null;
};

/**
 * Creates a BoletoLog.
 */
export class createBoletoLogPayload extends $Base<'createBoletoLogPayload'> {
	constructor() {
		super('createBoletoLogPayload');
	}

	boletoLog<Sel extends Selection<BoletoLog>>(
		selectorFn: (s: BoletoLog) => [...Sel],
	): $Field<'boletoLog', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new BoletoLog()),
		};
		return this.$_select('boletoLog', options as any) as any;
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}
}

/**
 * Updates a Cliente.
 */
export type updateClienteInput = {
	apellido?: string | null;
	clientMutationId?: string | null;
	createdAt?: string | null;
	direccion?: string | null;
	dpi?: string | null;
	email?: string | null;
	id: string;
	legacyId?: number | null;
	localidad?: string | null;
	nit?: string | null;
	nombre?: string | null;
	status?: Status | null;
	telefono?: string | null;
	updatedAt?: string | null;
};

/**
 * Updates a Cliente.
 */
export class updateClientePayload extends $Base<'updateClientePayload'> {
	constructor() {
		super('updateClientePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	cliente<Sel extends Selection<Cliente>>(
		selectorFn: (s: Cliente) => [...Sel],
	): $Field<'cliente', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Cliente()),
		};
		return this.$_select('cliente', options as any) as any;
	}
}

/**
 * Deletes a Cliente.
 */
export type deleteClienteInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Cliente.
 */
export class deleteClientePayload extends $Base<'deleteClientePayload'> {
	constructor() {
		super('deleteClientePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	cliente<Sel extends Selection<Cliente>>(
		selectorFn: (s: Cliente) => [...Sel],
	): $Field<'cliente', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Cliente()),
		};
		return this.$_select('cliente', options as any) as any;
	}
}

/**
 * Creates a Cliente.
 */
export type createClienteInput = {
	apellido?: string | null;
	clientMutationId?: string | null;
	createdAt: string;
	direccion?: string | null;
	dpi?: string | null;
	email?: string | null;
	legacyId?: number | null;
	localidad?: string | null;
	nit?: string | null;
	nombre: string;
	status?: Status | null;
	telefono?: string | null;
	updatedAt: string;
};

/**
 * Creates a Cliente.
 */
export class createClientePayload extends $Base<'createClientePayload'> {
	constructor() {
		super('createClientePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	cliente<Sel extends Selection<Cliente>>(
		selectorFn: (s: Cliente) => [...Sel],
	): $Field<'cliente', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Cliente()),
		};
		return this.$_select('cliente', options as any) as any;
	}
}

/**
 * Creates a Empresa.
 */
export type createEmpresaInput = {
	alias?: string | null;
	clientMutationId?: string | null;
	createdAt: string;
	denominacionSocial?: string | null;
	direccion?: string | null;
	email?: string | null;
	legacyId?: number | null;
	localidad?: string | null;
	nit?: string | null;
	nombre: string;
	nombreComercial?: string | null;
	status?: Status | null;
	telefono?: string | null;
	updatedAt: string;
};

/**
 * Creates a Empresa.
 */
export class createEmpresaPayload extends $Base<'createEmpresaPayload'> {
	constructor() {
		super('createEmpresaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	empresa<Sel extends Selection<Empresa>>(
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<'empresa', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Empresa()),
		};
		return this.$_select('empresa', options as any) as any;
	}
}

/**
 * Updates a Empresa.
 */
export type updateEmpresaInput = {
	alias?: string | null;
	clientMutationId?: string | null;
	createdAt?: string | null;
	denominacionSocial?: string | null;
	direccion?: string | null;
	email?: string | null;
	id: string;
	legacyId?: number | null;
	localidad?: string | null;
	nit?: string | null;
	nombre?: string | null;
	nombreComercial?: string | null;
	status?: Status | null;
	telefono?: string | null;
	updatedAt?: string | null;
};

/**
 * Updates a Empresa.
 */
export class updateEmpresaPayload extends $Base<'updateEmpresaPayload'> {
	constructor() {
		super('updateEmpresaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	empresa<Sel extends Selection<Empresa>>(
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<'empresa', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Empresa()),
		};
		return this.$_select('empresa', options as any) as any;
	}
}

/**
 * Deletes a Empresa.
 */
export type deleteEmpresaInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Empresa.
 */
export class deleteEmpresaPayload extends $Base<'deleteEmpresaPayload'> {
	constructor() {
		super('deleteEmpresaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	empresa<Sel extends Selection<Empresa>>(
		selectorFn: (s: Empresa) => [...Sel],
	): $Field<'empresa', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Empresa()),
		};
		return this.$_select('empresa', options as any) as any;
	}
}

/**
 * Updates a Enclave.
 */
export type updateEnclaveInput = {
	clientMutationId?: string | null;
	direccion?: string | null;
	email?: string | null;
	id: string;
	localidad?: string | null;
	nombre?: string | null;
	nota?: string | null;
	status?: Status | null;
	telefono?: string | null;
};

/**
 * Updates a Enclave.
 */
export class updateEnclavePayload extends $Base<'updateEnclavePayload'> {
	constructor() {
		super('updateEnclavePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	enclave<Sel extends Selection<Enclave>>(
		selectorFn: (s: Enclave) => [...Sel],
	): $Field<'enclave', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Enclave()),
		};
		return this.$_select('enclave', options as any) as any;
	}
}

/**
 * Deletes a Enclave.
 */
export type deleteEnclaveInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Enclave.
 */
export class deleteEnclavePayload extends $Base<'deleteEnclavePayload'> {
	constructor() {
		super('deleteEnclavePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	enclave<Sel extends Selection<Enclave>>(
		selectorFn: (s: Enclave) => [...Sel],
	): $Field<'enclave', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Enclave()),
		};
		return this.$_select('enclave', options as any) as any;
	}
}

/**
 * Creates a Enclave.
 */
export type createEnclaveInput = {
	clientMutationId?: string | null;
	direccion?: string | null;
	email?: string | null;
	localidad?: string | null;
	nombre?: string | null;
	nota?: string | null;
	status?: Status | null;
	telefono?: string | null;
};

/**
 * Creates a Enclave.
 */
export class createEnclavePayload extends $Base<'createEnclavePayload'> {
	constructor() {
		super('createEnclavePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	enclave<Sel extends Selection<Enclave>>(
		selectorFn: (s: Enclave) => [...Sel],
	): $Field<'enclave', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Enclave()),
		};
		return this.$_select('enclave', options as any) as any;
	}
}

/**
 * Creates a Estacion.
 */
export type createEstacionInput = {
	alias: string;
	clientMutationId?: string | null;
	direccion?: string | null;
	email?: string | null;
	legacyId?: number | null;
	localidad?: string | null;
	nombre?: string | null;
	nota?: string | null;
	slug?: string | null;
	status?: Status | null;
	telefono?: string | null;
	users?: Readonly<Array<string | null>> | null;
};

/**
 * Creates a Estacion.
 */
export class createEstacionPayload extends $Base<'createEstacionPayload'> {
	constructor() {
		super('createEstacionPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	estacion<Sel extends Selection<Estacion>>(
		selectorFn: (s: Estacion) => [...Sel],
	): $Field<'estacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Estacion()),
		};
		return this.$_select('estacion', options as any) as any;
	}
}

/**
 * Updates a Estacion.
 */
export type updateEstacionInput = {
	alias?: string | null;
	clientMutationId?: string | null;
	direccion?: string | null;
	email?: string | null;
	id: string;
	legacyId?: number | null;
	localidad?: string | null;
	nombre?: string | null;
	nota?: string | null;
	slug?: string | null;
	status?: Status | null;
	telefono?: string | null;
	users?: Readonly<Array<string | null>> | null;
};

/**
 * Updates a Estacion.
 */
export class updateEstacionPayload extends $Base<'updateEstacionPayload'> {
	constructor() {
		super('updateEstacionPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	estacion<Sel extends Selection<Estacion>>(
		selectorFn: (s: Estacion) => [...Sel],
	): $Field<'estacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Estacion()),
		};
		return this.$_select('estacion', options as any) as any;
	}
}

/**
 * Deletes a Estacion.
 */
export type deleteEstacionInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Estacion.
 */
export class deleteEstacionPayload extends $Base<'deleteEstacionPayload'> {
	constructor() {
		super('deleteEstacionPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	estacion<Sel extends Selection<Estacion>>(
		selectorFn: (s: Estacion) => [...Sel],
	): $Field<'estacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Estacion()),
		};
		return this.$_select('estacion', options as any) as any;
	}
}

/**
 * Updates a FDN.
 */
export type updateFDNInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Updates a FDN.
 */
export class updateFDNPayload extends $Base<'updateFDNPayload'> {
	constructor() {
		super('updateFDNPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	fDN<Sel extends Selection<FDN>>(
		selectorFn: (s: FDN) => [...Sel],
	): $Field<'fDN', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FDN()),
		};
		return this.$_select('fDN', options as any) as any;
	}
}

/**
 * Deletes a FDN.
 */
export type deleteFDNInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a FDN.
 */
export class deleteFDNPayload extends $Base<'deleteFDNPayload'> {
	constructor() {
		super('deleteFDNPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	fDN<Sel extends Selection<FDN>>(
		selectorFn: (s: FDN) => [...Sel],
	): $Field<'fDN', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FDN()),
		};
		return this.$_select('fDN', options as any) as any;
	}
}

/**
 * Creates a FDN.
 */
export type createFDNInput = {
	clientMutationId?: string | null;
};

/**
 * Creates a FDN.
 */
export class createFDNPayload extends $Base<'createFDNPayload'> {
	constructor() {
		super('createFDNPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	fDN<Sel extends Selection<FDN>>(
		selectorFn: (s: FDN) => [...Sel],
	): $Field<'fDN', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new FDN()),
		};
		return this.$_select('fDN', options as any) as any;
	}
}

/**
 * Updates a Factura.
 */
export type updateFacturaInput = {
	clientMutationId?: string | null;
	createdAt?: string | null;
	dte?: string | null;
	fecha?: string | null;
	id: string;
	serie?: string | null;
	status?: Status | null;
	updatedAt?: string | null;
	uuid?: string | null;
	venta?: string | null;
};

/**
 * Updates a Factura.
 */
export class updateFacturaPayload extends $Base<'updateFacturaPayload'> {
	constructor() {
		super('updateFacturaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	factura<Sel extends Selection<Factura>>(
		selectorFn: (s: Factura) => [...Sel],
	): $Field<'factura', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Factura()),
		};
		return this.$_select('factura', options as any) as any;
	}
}

/**
 * Deletes a Factura.
 */
export type deleteFacturaInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Factura.
 */
export class deleteFacturaPayload extends $Base<'deleteFacturaPayload'> {
	constructor() {
		super('deleteFacturaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	factura<Sel extends Selection<Factura>>(
		selectorFn: (s: Factura) => [...Sel],
	): $Field<'factura', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Factura()),
		};
		return this.$_select('factura', options as any) as any;
	}
}

/**
 * Creates a Factura.
 */
export type createFacturaInput = {
	clientMutationId?: string | null;
	createdAt: string;
	dte?: string | null;
	fecha?: string | null;
	serie?: string | null;
	status?: Status | null;
	updatedAt: string;
	uuid?: string | null;
	venta?: string | null;
};

/**
 * Creates a Factura.
 */
export class createFacturaPayload extends $Base<'createFacturaPayload'> {
	constructor() {
		super('createFacturaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	factura<Sel extends Selection<Factura>>(
		selectorFn: (s: Factura) => [...Sel],
	): $Field<'factura', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Factura()),
		};
		return this.$_select('factura', options as any) as any;
	}
}

/**
 * Creates a Localidad.
 */
export type createLocalidadInput = {
	clientMutationId?: string | null;
	nacion?: string | null;
	nombre: string;
};

/**
 * Creates a Localidad.
 */
export class createLocalidadPayload extends $Base<'createLocalidadPayload'> {
	constructor() {
		super('createLocalidadPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}
}

/**
 * Updates a Localidad.
 */
export type updateLocalidadInput = {
	clientMutationId?: string | null;
	id: string;
	nacion?: string | null;
	nombre?: string | null;
};

/**
 * Updates a Localidad.
 */
export class updateLocalidadPayload extends $Base<'updateLocalidadPayload'> {
	constructor() {
		super('updateLocalidadPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}
}

/**
 * Deletes a Localidad.
 */
export type deleteLocalidadInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Localidad.
 */
export class deleteLocalidadPayload extends $Base<'deleteLocalidadPayload'> {
	constructor() {
		super('deleteLocalidadPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	localidad<Sel extends Selection<Localidad>>(
		selectorFn: (s: Localidad) => [...Sel],
	): $Field<'localidad', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Localidad()),
		};
		return this.$_select('localidad', options as any) as any;
	}
}

/**
 * Creates a Menu.
 */
export type createMenuInput = {
	action?: string | null;
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	icon?: string | null;
	nombre?: string | null;
	parent?: string | null;
	posicion?: number | null;
	status?: Status | null;
	tipo?: string | null;
};

/**
 * Creates a Menu.
 */
export class createMenuPayload extends $Base<'createMenuPayload'> {
	constructor() {
		super('createMenuPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	menu<Sel extends Selection<Menu>>(
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'menu', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Menu()),
		};
		return this.$_select('menu', options as any) as any;
	}
}

/**
 * Updates a Menu.
 */
export type updateMenuInput = {
	action?: string | null;
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	icon?: string | null;
	id: string;
	nombre?: string | null;
	parent?: string | null;
	posicion?: number | null;
	status?: Status | null;
	tipo?: string | null;
};

/**
 * Updates a Menu.
 */
export class updateMenuPayload extends $Base<'updateMenuPayload'> {
	constructor() {
		super('updateMenuPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	menu<Sel extends Selection<Menu>>(
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'menu', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Menu()),
		};
		return this.$_select('menu', options as any) as any;
	}
}

/**
 * Deletes a Menu.
 */
export type deleteMenuInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Menu.
 */
export class deleteMenuPayload extends $Base<'deleteMenuPayload'> {
	constructor() {
		super('deleteMenuPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	menu<Sel extends Selection<Menu>>(
		selectorFn: (s: Menu) => [...Sel],
	): $Field<'menu', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Menu()),
		};
		return this.$_select('menu', options as any) as any;
	}
}

/**
 * Creates a Nacion.
 */
export type createNacionInput = {
	clientMutationId?: string | null;
	nombre: string;
};

/**
 * Creates a Nacion.
 */
export class createNacionPayload extends $Base<'createNacionPayload'> {
	constructor() {
		super('createNacionPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	nacion<Sel extends Selection<Nacion>>(
		selectorFn: (s: Nacion) => [...Sel],
	): $Field<'nacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Nacion()),
		};
		return this.$_select('nacion', options as any) as any;
	}
}

/**
 * Updates a Nacion.
 */
export type updateNacionInput = {
	clientMutationId?: string | null;
	id: string;
	nombre?: string | null;
};

/**
 * Updates a Nacion.
 */
export class updateNacionPayload extends $Base<'updateNacionPayload'> {
	constructor() {
		super('updateNacionPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	nacion<Sel extends Selection<Nacion>>(
		selectorFn: (s: Nacion) => [...Sel],
	): $Field<'nacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Nacion()),
		};
		return this.$_select('nacion', options as any) as any;
	}
}

/**
 * Deletes a Nacion.
 */
export type deleteNacionInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Nacion.
 */
export class deleteNacionPayload extends $Base<'deleteNacionPayload'> {
	constructor() {
		super('deleteNacionPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	nacion<Sel extends Selection<Nacion>>(
		selectorFn: (s: Nacion) => [...Sel],
	): $Field<'nacion', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Nacion()),
		};
		return this.$_select('nacion', options as any) as any;
	}
}

/**
 * Updates a Parada.
 */
export type updateParadaInput = {
	clientMutationId?: string | null;
	enclave?: string | null;
	id: string;
	nombre?: string | null;
	nota?: string | null;
	recorridos?: Readonly<Array<string | null>> | null;
	status?: Status | null;
};

/**
 * Updates a Parada.
 */
export class updateParadaPayload extends $Base<'updateParadaPayload'> {
	constructor() {
		super('updateParadaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	parada<Sel extends Selection<Parada>>(
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'parada', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Parada()),
		};
		return this.$_select('parada', options as any) as any;
	}
}

/**
 * Deletes a Parada.
 */
export type deleteParadaInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Parada.
 */
export class deleteParadaPayload extends $Base<'deleteParadaPayload'> {
	constructor() {
		super('deleteParadaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	parada<Sel extends Selection<Parada>>(
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'parada', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Parada()),
		};
		return this.$_select('parada', options as any) as any;
	}
}

/**
 * Creates a Parada.
 */
export type createParadaInput = {
	clientMutationId?: string | null;
	enclave?: string | null;
	nombre?: string | null;
	nota?: string | null;
	recorridos?: Readonly<Array<string | null>> | null;
	status?: Status | null;
};

/**
 * Creates a Parada.
 */
export class createParadaPayload extends $Base<'createParadaPayload'> {
	constructor() {
		super('createParadaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	parada<Sel extends Selection<Parada>>(
		selectorFn: (s: Parada) => [...Sel],
	): $Field<'parada', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Parada()),
		};
		return this.$_select('parada', options as any) as any;
	}
}

/**
 * Creates a Permiso.
 */
export type createPermisoInput = {
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	nombre?: string | null;
	nota?: string | null;
	parents?: Readonly<Array<string | null>> | null;
	roles?: Readonly<Array<string | null>> | null;
	status?: Status | null;
};

/**
 * Creates a Permiso.
 */
export class createPermisoPayload extends $Base<'createPermisoPayload'> {
	constructor() {
		super('createPermisoPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	permiso<Sel extends Selection<Permiso>>(
		selectorFn: (s: Permiso) => [...Sel],
	): $Field<'permiso', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Permiso()),
		};
		return this.$_select('permiso', options as any) as any;
	}
}

/**
 * Updates a Permiso.
 */
export type updatePermisoInput = {
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	id: string;
	nombre?: string | null;
	nota?: string | null;
	parents?: Readonly<Array<string | null>> | null;
	roles?: Readonly<Array<string | null>> | null;
	status?: Status | null;
};

/**
 * Updates a Permiso.
 */
export class updatePermisoPayload extends $Base<'updatePermisoPayload'> {
	constructor() {
		super('updatePermisoPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	permiso<Sel extends Selection<Permiso>>(
		selectorFn: (s: Permiso) => [...Sel],
	): $Field<'permiso', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Permiso()),
		};
		return this.$_select('permiso', options as any) as any;
	}
}

/**
 * Deletes a Permiso.
 */
export type deletePermisoInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Permiso.
 */
export class deletePermisoPayload extends $Base<'deletePermisoPayload'> {
	constructor() {
		super('deletePermisoPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	permiso<Sel extends Selection<Permiso>>(
		selectorFn: (s: Permiso) => [...Sel],
	): $Field<'permiso', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Permiso()),
		};
		return this.$_select('permiso', options as any) as any;
	}
}

/**
 * Updates a Recorrido.
 */
export type updateRecorridoInput = {
	clientMutationId?: string | null;
	distancia?: number | null;
	final?: string | null;
	id: string;
	inicio?: string | null;
	legacyId?: number | null;
	nombre?: string | null;
	nota?: string | null;
	status?: Status | null;
	tiempo?: string | null;
};

/**
 * Updates a Recorrido.
 */
export class updateRecorridoPayload extends $Base<'updateRecorridoPayload'> {
	constructor() {
		super('updateRecorridoPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	recorrido<Sel extends Selection<Recorrido>>(
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'recorrido', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('recorrido', options as any) as any;
	}
}

/**
 * Deletes a Recorrido.
 */
export type deleteRecorridoInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Recorrido.
 */
export class deleteRecorridoPayload extends $Base<'deleteRecorridoPayload'> {
	constructor() {
		super('deleteRecorridoPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	recorrido<Sel extends Selection<Recorrido>>(
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'recorrido', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('recorrido', options as any) as any;
	}
}

/**
 * Creates a Recorrido.
 */
export type createRecorridoInput = {
	clientMutationId?: string | null;
	distancia?: number | null;
	final?: string | null;
	inicio?: string | null;
	legacyId?: number | null;
	nombre?: string | null;
	nota?: string | null;
	status?: Status | null;
	tiempo?: string | null;
};

/**
 * Creates a Recorrido.
 */
export class createRecorridoPayload extends $Base<'createRecorridoPayload'> {
	constructor() {
		super('createRecorridoPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	recorrido<Sel extends Selection<Recorrido>>(
		selectorFn: (s: Recorrido) => [...Sel],
	): $Field<'recorrido', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Recorrido()),
		};
		return this.$_select('recorrido', options as any) as any;
	}
}

/**
 * Updates a RecorridoAsientoPrecio.
 */
export type updateRecorridoAsientoPrecioInput = {
	clientMutationId?: string | null;
	id: string;
	precioAsientoA?: number | null;
	precioAsientoB?: number | null;
	recorrido?: string | null;
};

/**
 * Updates a RecorridoAsientoPrecio.
 */
export class updateRecorridoAsientoPrecioPayload extends $Base<'updateRecorridoAsientoPrecioPayload'> {
	constructor() {
		super('updateRecorridoAsientoPrecioPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	recorridoAsientoPrecio<Sel extends Selection<RecorridoAsientoPrecio>>(
		selectorFn: (s: RecorridoAsientoPrecio) => [...Sel],
	): $Field<
		'recorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new RecorridoAsientoPrecio()),
		};
		return this.$_select('recorridoAsientoPrecio', options as any) as any;
	}
}

/**
 * Deletes a RecorridoAsientoPrecio.
 */
export type deleteRecorridoAsientoPrecioInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a RecorridoAsientoPrecio.
 */
export class deleteRecorridoAsientoPrecioPayload extends $Base<'deleteRecorridoAsientoPrecioPayload'> {
	constructor() {
		super('deleteRecorridoAsientoPrecioPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	recorridoAsientoPrecio<Sel extends Selection<RecorridoAsientoPrecio>>(
		selectorFn: (s: RecorridoAsientoPrecio) => [...Sel],
	): $Field<
		'recorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new RecorridoAsientoPrecio()),
		};
		return this.$_select('recorridoAsientoPrecio', options as any) as any;
	}
}

/**
 * Creates a RecorridoAsientoPrecio.
 */
export type createRecorridoAsientoPrecioInput = {
	clientMutationId?: string | null;
	precioAsientoA?: number | null;
	precioAsientoB?: number | null;
	recorrido: string;
};

/**
 * Creates a RecorridoAsientoPrecio.
 */
export class createRecorridoAsientoPrecioPayload extends $Base<'createRecorridoAsientoPrecioPayload'> {
	constructor() {
		super('createRecorridoAsientoPrecioPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	recorridoAsientoPrecio<Sel extends Selection<RecorridoAsientoPrecio>>(
		selectorFn: (s: RecorridoAsientoPrecio) => [...Sel],
	): $Field<
		'recorridoAsientoPrecio',
		GetOutput<Sel> | null,
		GetVariables<Sel>
	> {
		const options = {
			selection: selectorFn(new RecorridoAsientoPrecio()),
		};
		return this.$_select('recorridoAsientoPrecio', options as any) as any;
	}
}

/**
 * Creates a Role.
 */
export type createRoleInput = {
	actions?: Readonly<Array<string | null>> | null;
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	nombre: string;
	parents?: Readonly<Array<string | null>> | null;
	permisos?: Readonly<Array<string | null>> | null;
};

/**
 * Creates a Role.
 */
export class createRolePayload extends $Base<'createRolePayload'> {
	constructor() {
		super('createRolePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	role<Sel extends Selection<Role>>(
		selectorFn: (s: Role) => [...Sel],
	): $Field<'role', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Role()),
		};
		return this.$_select('role', options as any) as any;
	}
}

/**
 * Updates a Role.
 */
export type updateRoleInput = {
	actions?: Readonly<Array<string | null>> | null;
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	id: string;
	nombre?: string | null;
	parents?: Readonly<Array<string | null>> | null;
	permisos?: Readonly<Array<string | null>> | null;
};

/**
 * Updates a Role.
 */
export class updateRolePayload extends $Base<'updateRolePayload'> {
	constructor() {
		super('updateRolePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	role<Sel extends Selection<Role>>(
		selectorFn: (s: Role) => [...Sel],
	): $Field<'role', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Role()),
		};
		return this.$_select('role', options as any) as any;
	}
}

/**
 * Deletes a Role.
 */
export type deleteRoleInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Role.
 */
export class deleteRolePayload extends $Base<'deleteRolePayload'> {
	constructor() {
		super('deleteRolePayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	role<Sel extends Selection<Role>>(
		selectorFn: (s: Role) => [...Sel],
	): $Field<'role', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Role()),
		};
		return this.$_select('role', options as any) as any;
	}
}

/**
 * Updates a Salida.
 */
export type updateSalidaInput = {
	boletos?: Readonly<Array<string | null>> | null;
	bus?: string | null;
	clientMutationId?: string | null;
	createdAt?: string | null;
	empresa?: string | null;
	fecha?: string | null;
	id: string;
	recorrido?: string | null;
	salidaLogs?: Readonly<Array<string | null>> | null;
	status?: Status | null;
	updatedAt?: string | null;
};

/**
 * Updates a Salida.
 */
export class updateSalidaPayload extends $Base<'updateSalidaPayload'> {
	constructor() {
		super('updateSalidaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	salida<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'salida', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('salida', options as any) as any;
	}
}

/**
 * Deletes a Salida.
 */
export type deleteSalidaInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Salida.
 */
export class deleteSalidaPayload extends $Base<'deleteSalidaPayload'> {
	constructor() {
		super('deleteSalidaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	salida<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'salida', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('salida', options as any) as any;
	}
}

/**
 * Creates a Salida.
 */
export type createSalidaInput = {
	boletos?: Readonly<Array<string | null>> | null;
	bus?: string | null;
	clientMutationId?: string | null;
	createdAt: string;
	empresa?: string | null;
	fecha?: string | null;
	recorrido: string;
	salidaLogs?: Readonly<Array<string | null>> | null;
	status?: Status | null;
	updatedAt: string;
};

/**
 * Creates a Salida.
 */
export class createSalidaPayload extends $Base<'createSalidaPayload'> {
	constructor() {
		super('createSalidaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	salida<Sel extends Selection<Salida>>(
		selectorFn: (s: Salida) => [...Sel],
	): $Field<'salida', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Salida()),
		};
		return this.$_select('salida', options as any) as any;
	}
}

/**
 * Updates a SalidaLog.
 */
export type updateSalidaLogInput = {
	clientMutationId?: string | null;
	createdAt?: string | null;
	descripcion?: string | null;
	id: string;
	salida?: string | null;
	tipo?: string | null;
	updatedAt?: string | null;
	user?: string | null;
};

/**
 * Updates a SalidaLog.
 */
export class updateSalidaLogPayload extends $Base<'updateSalidaLogPayload'> {
	constructor() {
		super('updateSalidaLogPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	salidaLog<Sel extends Selection<SalidaLog>>(
		selectorFn: (s: SalidaLog) => [...Sel],
	): $Field<'salidaLog', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaLog()),
		};
		return this.$_select('salidaLog', options as any) as any;
	}
}

/**
 * Deletes a SalidaLog.
 */
export type deleteSalidaLogInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a SalidaLog.
 */
export class deleteSalidaLogPayload extends $Base<'deleteSalidaLogPayload'> {
	constructor() {
		super('deleteSalidaLogPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	salidaLog<Sel extends Selection<SalidaLog>>(
		selectorFn: (s: SalidaLog) => [...Sel],
	): $Field<'salidaLog', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaLog()),
		};
		return this.$_select('salidaLog', options as any) as any;
	}
}

/**
 * Creates a SalidaLog.
 */
export type createSalidaLogInput = {
	clientMutationId?: string | null;
	createdAt: string;
	descripcion?: string | null;
	salida: string;
	tipo?: string | null;
	updatedAt: string;
	user?: string | null;
};

/**
 * Creates a SalidaLog.
 */
export class createSalidaLogPayload extends $Base<'createSalidaLogPayload'> {
	constructor() {
		super('createSalidaLogPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	salidaLog<Sel extends Selection<SalidaLog>>(
		selectorFn: (s: SalidaLog) => [...Sel],
	): $Field<'salidaLog', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new SalidaLog()),
		};
		return this.$_select('salidaLog', options as any) as any;
	}
}

/**
 * Updates a Taxon.
 */
export type updateTaxonInput = {
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	id: string;
	nombre?: string | null;
	nota?: string | null;
	parent?: string | null;
	posicion?: number | null;
	status?: Status | null;
};

/**
 * Updates a Taxon.
 */
export class updateTaxonPayload extends $Base<'updateTaxonPayload'> {
	constructor() {
		super('updateTaxonPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	taxon<Sel extends Selection<Taxon>>(
		selectorFn: (s: Taxon) => [...Sel],
	): $Field<'taxon', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Taxon()),
		};
		return this.$_select('taxon', options as any) as any;
	}
}

/**
 * Deletes a Taxon.
 */
export type deleteTaxonInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Taxon.
 */
export class deleteTaxonPayload extends $Base<'deleteTaxonPayload'> {
	constructor() {
		super('deleteTaxonPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	taxon<Sel extends Selection<Taxon>>(
		selectorFn: (s: Taxon) => [...Sel],
	): $Field<'taxon', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Taxon()),
		};
		return this.$_select('taxon', options as any) as any;
	}
}

/**
 * Creates a Taxon.
 */
export type createTaxonInput = {
	children?: Readonly<Array<string | null>> | null;
	clientMutationId?: string | null;
	nombre?: string | null;
	nota?: string | null;
	parent?: string | null;
	posicion?: number | null;
	status?: Status | null;
};

/**
 * Creates a Taxon.
 */
export class createTaxonPayload extends $Base<'createTaxonPayload'> {
	constructor() {
		super('createTaxonPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	taxon<Sel extends Selection<Taxon>>(
		selectorFn: (s: Taxon) => [...Sel],
	): $Field<'taxon', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Taxon()),
		};
		return this.$_select('taxon', options as any) as any;
	}
}

/**
 * Creates a User.
 */
export type createUserInput = {
	apellido?: string | null;
	clientMutationId?: string | null;
	createdAt: string;
	direccion?: string | null;
	email?: string | null;
	legacyId?: number | null;
	localidad?: string | null;
	nit?: string | null;
	nombre: string;
	password?: string | null;
	permisos?: Readonly<Array<string | null>> | null;
	roles?: Readonly<Array<string | null>> | null;
	status?: Status | null;
	telefono?: string | null;
	updatedAt: string;
	username: string;
};

/**
 * Creates a User.
 */
export class createUserPayload extends $Base<'createUserPayload'> {
	constructor() {
		super('createUserPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}
}

/**
 * Updates a User.
 */
export type updateUserInput = {
	apellido?: string | null;
	clientMutationId?: string | null;
	createdAt?: string | null;
	direccion?: string | null;
	email?: string | null;
	id: string;
	legacyId?: number | null;
	localidad?: string | null;
	nit?: string | null;
	nombre?: string | null;
	password?: string | null;
	permisos?: Readonly<Array<string | null>> | null;
	roles?: Readonly<Array<string | null>> | null;
	status?: Status | null;
	telefono?: string | null;
	updatedAt?: string | null;
	username?: string | null;
};

/**
 * Updates a User.
 */
export class updateUserPayload extends $Base<'updateUserPayload'> {
	constructor() {
		super('updateUserPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}
}

/**
 * Deletes a User.
 */
export type deleteUserInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a User.
 */
export class deleteUserPayload extends $Base<'deleteUserPayload'> {
	constructor() {
		super('deleteUserPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	user<Sel extends Selection<User>>(
		selectorFn: (s: User) => [...Sel],
	): $Field<'user', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new User()),
		};
		return this.$_select('user', options as any) as any;
	}
}

/**
 * Updates a Venta.
 */
export type updateVentaInput = {
	clientMutationId?: string | null;
	createdAt?: string | null;
	factura?: string | null;
	id: string;
	ida?: string | null;
	precio?: number | null;
	regreso?: string | null;
	status?: Status | null;
	updatedAt?: string | null;
	user?: string | null;
};

/**
 * Updates a Venta.
 */
export class updateVentaPayload extends $Base<'updateVentaPayload'> {
	constructor() {
		super('updateVentaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	venta<Sel extends Selection<Venta>>(
		selectorFn: (s: Venta) => [...Sel],
	): $Field<'venta', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Venta()),
		};
		return this.$_select('venta', options as any) as any;
	}
}

/**
 * Deletes a Venta.
 */
export type deleteVentaInput = {
	clientMutationId?: string | null;
	id: string;
};

/**
 * Deletes a Venta.
 */
export class deleteVentaPayload extends $Base<'deleteVentaPayload'> {
	constructor() {
		super('deleteVentaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	venta<Sel extends Selection<Venta>>(
		selectorFn: (s: Venta) => [...Sel],
	): $Field<'venta', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Venta()),
		};
		return this.$_select('venta', options as any) as any;
	}
}

/**
 * Creates a Venta.
 */
export type createVentaInput = {
	clientMutationId?: string | null;
	createdAt: string;
	factura?: string | null;
	ida: string;
	precio?: number | null;
	regreso: string;
	status?: Status | null;
	updatedAt: string;
	user: string;
};

/**
 * Creates a Venta.
 */
export class createVentaPayload extends $Base<'createVentaPayload'> {
	constructor() {
		super('createVentaPayload');
	}

	get clientMutationId(): $Field<'clientMutationId', string | null> {
		return this.$_select('clientMutationId') as any;
	}

	venta<Sel extends Selection<Venta>>(
		selectorFn: (s: Venta) => [...Sel],
	): $Field<'venta', GetOutput<Sel> | null, GetVariables<Sel>> {
		const options = {
			selection: selectorFn(new Venta()),
		};
		return this.$_select('venta', options as any) as any;
	}
}

const $Root = {
	query: Query,
	mutation: Mutation,
};

namespace $RootTypes {
	export type query = Query;
	export type mutation = Mutation;
}

export function query<Sel extends Selection<$RootTypes.query>>(
	name: string,
	selectFn: (q: $RootTypes.query) => [...Sel],
): TypedDocumentNode<GetOutput<Sel>, GetVariables<Sel>>;
export function query<Sel extends Selection<$RootTypes.query>>(
	selectFn: (q: $RootTypes.query) => [...Sel],
): TypedDocumentNode<GetOutput<Sel>, Simplify<GetVariables<Sel>>>;
export function query<Sel extends Selection<$RootTypes.query>>(
	name: any,
	selectFn?: any,
) {
	if (!selectFn) {
		selectFn = name;
		name = '';
	}
	let field = new $Field<'query', GetOutput<Sel>, GetVariables<Sel>>('query', {
		selection: selectFn(new $Root.query()),
	});
	const str = fieldToQuery(`query ${name}`, field);

	return gql(str) as any;
}

export function mutation<Sel extends Selection<$RootTypes.mutation>>(
	name: string,
	selectFn: (q: $RootTypes.mutation) => [...Sel],
): TypedDocumentNode<GetOutput<Sel>, GetVariables<Sel>>;
export function mutation<Sel extends Selection<$RootTypes.mutation>>(
	selectFn: (q: $RootTypes.mutation) => [...Sel],
): TypedDocumentNode<GetOutput<Sel>, Simplify<GetVariables<Sel>>>;
export function mutation<Sel extends Selection<$RootTypes.query>>(
	name: any,
	selectFn?: any,
) {
	if (!selectFn) {
		selectFn = name;
		name = '';
	}
	let field = new $Field<'mutation', GetOutput<Sel>, GetVariables<Sel>>(
		'mutation',
		{
			selection: selectFn(new $Root.mutation()),
		},
	);
	const str = fieldToQuery(`mutation ${name}`, field);

	return gql(str) as any;
}

const $InputTypes: { [key: string]: { [key: string]: string } } = {
	RoleFilter_order: {
		id: 'String',
		nombre: 'String',
	},
	PermisoFilter_order: {
		id: 'String',
		nombre: 'String',
		status: 'String',
	},
	ActionFilter_order: {
		id: 'String',
		nombre: 'String',
		status: 'String',
	},
	UserFilter_createdAt: {
		after: 'String',
		before: 'String',
		strictly_after: 'String',
		strictly_before: 'String',
	},
	UserFilter_order: {
		apellido: 'String',
		createdAt: 'String',
		id: 'String',
		nombre: 'String',
		status: 'String',
		username: 'String',
	},
	BusFilter_createdAt: {
		after: 'String',
		before: 'String',
		strictly_after: 'String',
		strictly_before: 'String',
	},
	BusFilter_order: {
		createdAt: 'String',
		id: 'String',
		marca: 'String',
		placa: 'String',
		status: 'String',
	},
	EstacionFilter_order: {
		alias: 'String',
		id: 'String',
		nombre: 'String',
		status: 'String',
	},
	LocalidadFilter_order: {
		id: 'String',
		nombre: 'String',
	},
	MenuFilter_order: {
		id: 'String',
		nombre: 'String',
		status: 'String',
	},
	PilotoFilter_createdAt: {
		after: 'String',
		before: 'String',
		strictly_after: 'String',
		strictly_before: 'String',
	},
	PilotoFilter_order: {
		createdAt: 'String',
		email: 'String',
		id: 'String',
		nombre: 'String',
		status: 'String',
	},
	deleteAgnosticInput: {
		clientMutationId: 'String',
		ids: '[ID]',
		resource: 'String',
	},
	createActionInput: {
		clientMutationId: 'String',
		nombre: 'String',
		roles: '[String]',
		ruta: 'String',
		status: 'Status',
	},
	updateActionInput: {
		clientMutationId: 'String',
		id: 'ID!',
		nombre: 'String',
		roles: '[String]',
		ruta: 'String',
		status: 'Status',
	},
	deleteActionInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateAgenciaInput: {
		alias: 'String',
		clientMutationId: 'String',
		direccion: 'String',
		email: 'String',
		id: 'ID!',
		legacyId: 'Int',
		localidad: 'String',
		nombre: 'String',
		nota: 'String',
		status: 'Status',
		telefono: 'String',
		users: '[String]',
	},
	deleteAgenciaInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createAgenciaInput: {
		alias: 'String!',
		clientMutationId: 'String',
		direccion: 'String',
		email: 'String',
		legacyId: 'Int',
		localidad: 'String',
		nombre: 'String',
		nota: 'String',
		status: 'Status',
		telefono: 'String',
		users: '[String]',
	},
	updateAsientoInput: {
		bus: 'String',
		clase: 'String',
		clientMutationId: 'String',
		id: 'ID!',
		numero: 'Int',
	},
	deleteAsientoInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createAsientoInput: {
		bus: 'String!',
		clase: 'String',
		clientMutationId: 'String',
		numero: 'Int!',
	},
	updateBoletoInput: {
		asiento: 'String',
		boletoLogs: '[String]',
		clientMutationId: 'String',
		cliente: 'String',
		createdAt: 'String',
		id: 'ID!',
		precio: 'Float',
		salida: 'String',
		status: 'Status',
		updatedAt: 'String',
	},
	deleteBoletoInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createBoletoInput: {
		asiento: 'String!',
		boletoLogs: '[String]',
		clientMutationId: 'String',
		cliente: 'String!',
		createdAt: 'String!',
		precio: 'Float',
		salida: 'String!',
		status: 'Status',
		updatedAt: 'String!',
	},
	updateBoletoLogInput: {
		boleto: 'String',
		clientMutationId: 'String',
		createdAt: 'String',
		descripcion: 'String',
		id: 'ID!',
		tipo: 'Int',
		updatedAt: 'String',
		user: 'String',
	},
	deleteBoletoLogInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createBoletoLogInput: {
		boleto: 'String!',
		clientMutationId: 'String',
		createdAt: 'String!',
		descripcion: 'String',
		tipo: 'Int',
		updatedAt: 'String!',
		user: 'String',
	},
	updateClienteInput: {
		apellido: 'String',
		clientMutationId: 'String',
		createdAt: 'String',
		direccion: 'String',
		dpi: 'String',
		email: 'String',
		id: 'ID!',
		legacyId: 'Int',
		localidad: 'String',
		nit: 'String',
		nombre: 'String',
		status: 'Status',
		telefono: 'String',
		updatedAt: 'String',
	},
	deleteClienteInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createClienteInput: {
		apellido: 'String',
		clientMutationId: 'String',
		createdAt: 'String!',
		direccion: 'String',
		dpi: 'String',
		email: 'String',
		legacyId: 'Int',
		localidad: 'String',
		nit: 'String',
		nombre: 'String!',
		status: 'Status',
		telefono: 'String',
		updatedAt: 'String!',
	},
	createEmpresaInput: {
		alias: 'String',
		clientMutationId: 'String',
		createdAt: 'String!',
		denominacionSocial: 'String',
		direccion: 'String',
		email: 'String',
		legacyId: 'Int',
		localidad: 'String',
		nit: 'String',
		nombre: 'String!',
		nombreComercial: 'String',
		status: 'Status',
		telefono: 'String',
		updatedAt: 'String!',
	},
	updateEmpresaInput: {
		alias: 'String',
		clientMutationId: 'String',
		createdAt: 'String',
		denominacionSocial: 'String',
		direccion: 'String',
		email: 'String',
		id: 'ID!',
		legacyId: 'Int',
		localidad: 'String',
		nit: 'String',
		nombre: 'String',
		nombreComercial: 'String',
		status: 'Status',
		telefono: 'String',
		updatedAt: 'String',
	},
	deleteEmpresaInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateEnclaveInput: {
		clientMutationId: 'String',
		direccion: 'String',
		email: 'String',
		id: 'ID!',
		localidad: 'String',
		nombre: 'String',
		nota: 'String',
		status: 'Status',
		telefono: 'String',
	},
	deleteEnclaveInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createEnclaveInput: {
		clientMutationId: 'String',
		direccion: 'String',
		email: 'String',
		localidad: 'String',
		nombre: 'String',
		nota: 'String',
		status: 'Status',
		telefono: 'String',
	},
	createEstacionInput: {
		alias: 'String!',
		clientMutationId: 'String',
		direccion: 'String',
		email: 'String',
		legacyId: 'Int',
		localidad: 'String',
		nombre: 'String',
		nota: 'String',
		slug: 'String',
		status: 'Status',
		telefono: 'String',
		users: '[String]',
	},
	updateEstacionInput: {
		alias: 'String',
		clientMutationId: 'String',
		direccion: 'String',
		email: 'String',
		id: 'ID!',
		legacyId: 'Int',
		localidad: 'String',
		nombre: 'String',
		nota: 'String',
		slug: 'String',
		status: 'Status',
		telefono: 'String',
		users: '[String]',
	},
	deleteEstacionInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateFDNInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	deleteFDNInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createFDNInput: {
		clientMutationId: 'String',
	},
	updateFacturaInput: {
		clientMutationId: 'String',
		createdAt: 'String',
		dte: 'String',
		fecha: 'String',
		id: 'ID!',
		serie: 'String',
		status: 'Status',
		updatedAt: 'String',
		uuid: 'String',
		venta: 'String',
	},
	deleteFacturaInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createFacturaInput: {
		clientMutationId: 'String',
		createdAt: 'String!',
		dte: 'String',
		fecha: 'String',
		serie: 'String',
		status: 'Status',
		updatedAt: 'String!',
		uuid: 'String',
		venta: 'String',
	},
	createLocalidadInput: {
		clientMutationId: 'String',
		nacion: 'String',
		nombre: 'String!',
	},
	updateLocalidadInput: {
		clientMutationId: 'String',
		id: 'ID!',
		nacion: 'String',
		nombre: 'String',
	},
	deleteLocalidadInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createMenuInput: {
		action: 'String',
		children: '[String]',
		clientMutationId: 'String',
		icon: 'String',
		nombre: 'String',
		parent: 'String',
		posicion: 'Int',
		status: 'Status',
		tipo: 'String',
	},
	updateMenuInput: {
		action: 'String',
		children: '[String]',
		clientMutationId: 'String',
		icon: 'String',
		id: 'ID!',
		nombre: 'String',
		parent: 'String',
		posicion: 'Int',
		status: 'Status',
		tipo: 'String',
	},
	deleteMenuInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createNacionInput: {
		clientMutationId: 'String',
		nombre: 'String!',
	},
	updateNacionInput: {
		clientMutationId: 'String',
		id: 'ID!',
		nombre: 'String',
	},
	deleteNacionInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateParadaInput: {
		clientMutationId: 'String',
		enclave: 'String',
		id: 'ID!',
		nombre: 'String',
		nota: 'String',
		recorridos: '[String]',
		status: 'Status',
	},
	deleteParadaInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createParadaInput: {
		clientMutationId: 'String',
		enclave: 'String',
		nombre: 'String',
		nota: 'String',
		recorridos: '[String]',
		status: 'Status',
	},
	createPermisoInput: {
		children: '[String]',
		clientMutationId: 'String',
		nombre: 'String',
		nota: 'String',
		parents: '[String]',
		roles: '[String]',
		status: 'Status',
	},
	updatePermisoInput: {
		children: '[String]',
		clientMutationId: 'String',
		id: 'ID!',
		nombre: 'String',
		nota: 'String',
		parents: '[String]',
		roles: '[String]',
		status: 'Status',
	},
	deletePermisoInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateRecorridoInput: {
		clientMutationId: 'String',
		distancia: 'Float',
		final: 'String',
		id: 'ID!',
		inicio: 'String',
		legacyId: 'Int',
		nombre: 'String',
		nota: 'String',
		status: 'Status',
		tiempo: 'String',
	},
	deleteRecorridoInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createRecorridoInput: {
		clientMutationId: 'String',
		distancia: 'Float',
		final: 'String',
		inicio: 'String',
		legacyId: 'Int',
		nombre: 'String',
		nota: 'String',
		status: 'Status',
		tiempo: 'String',
	},
	updateRecorridoAsientoPrecioInput: {
		clientMutationId: 'String',
		id: 'ID!',
		precioAsientoA: 'Float',
		precioAsientoB: 'Float',
		recorrido: 'String',
	},
	deleteRecorridoAsientoPrecioInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createRecorridoAsientoPrecioInput: {
		clientMutationId: 'String',
		precioAsientoA: 'Float',
		precioAsientoB: 'Float',
		recorrido: 'String!',
	},
	createRoleInput: {
		actions: '[String]',
		children: '[String]',
		clientMutationId: 'String',
		nombre: 'String!',
		parents: '[String]',
		permisos: '[String]',
	},
	updateRoleInput: {
		actions: '[String]',
		children: '[String]',
		clientMutationId: 'String',
		id: 'ID!',
		nombre: 'String',
		parents: '[String]',
		permisos: '[String]',
	},
	deleteRoleInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateSalidaInput: {
		boletos: '[String]',
		bus: 'String',
		clientMutationId: 'String',
		createdAt: 'String',
		empresa: 'String',
		fecha: 'String',
		id: 'ID!',
		recorrido: 'String',
		salidaLogs: '[String]',
		status: 'Status',
		updatedAt: 'String',
	},
	deleteSalidaInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createSalidaInput: {
		boletos: '[String]',
		bus: 'String',
		clientMutationId: 'String',
		createdAt: 'String!',
		empresa: 'String',
		fecha: 'String',
		recorrido: 'String!',
		salidaLogs: '[String]',
		status: 'Status',
		updatedAt: 'String!',
	},
	updateSalidaLogInput: {
		clientMutationId: 'String',
		createdAt: 'String',
		descripcion: 'String',
		id: 'ID!',
		salida: 'String',
		tipo: 'String',
		updatedAt: 'String',
		user: 'String',
	},
	deleteSalidaLogInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createSalidaLogInput: {
		clientMutationId: 'String',
		createdAt: 'String!',
		descripcion: 'String',
		salida: 'String!',
		tipo: 'String',
		updatedAt: 'String!',
		user: 'String',
	},
	updateTaxonInput: {
		children: '[String]',
		clientMutationId: 'String',
		id: 'ID!',
		nombre: 'String',
		nota: 'String',
		parent: 'String',
		posicion: 'Int',
		status: 'Status',
	},
	deleteTaxonInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createTaxonInput: {
		children: '[String]',
		clientMutationId: 'String',
		nombre: 'String',
		nota: 'String',
		parent: 'String',
		posicion: 'Int',
		status: 'Status',
	},
	createUserInput: {
		apellido: 'String',
		clientMutationId: 'String',
		createdAt: 'String!',
		direccion: 'String',
		email: 'String',
		legacyId: 'Int',
		localidad: 'String',
		nit: 'String',
		nombre: 'String!',
		password: 'String',
		permisos: '[String]',
		roles: '[String]',
		status: 'Status',
		telefono: 'String',
		updatedAt: 'String!',
		username: 'String!',
	},
	updateUserInput: {
		apellido: 'String',
		clientMutationId: 'String',
		createdAt: 'String',
		direccion: 'String',
		email: 'String',
		id: 'ID!',
		legacyId: 'Int',
		localidad: 'String',
		nit: 'String',
		nombre: 'String',
		password: 'String',
		permisos: '[String]',
		roles: '[String]',
		status: 'Status',
		telefono: 'String',
		updatedAt: 'String',
		username: 'String',
	},
	deleteUserInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	updateVentaInput: {
		clientMutationId: 'String',
		createdAt: 'String',
		factura: 'String',
		id: 'ID!',
		ida: 'String',
		precio: 'Float',
		regreso: 'String',
		status: 'Status',
		updatedAt: 'String',
		user: 'String',
	},
	deleteVentaInput: {
		clientMutationId: 'String',
		id: 'ID!',
	},
	createVentaInput: {
		clientMutationId: 'String',
		createdAt: 'String!',
		factura: 'String',
		ida: 'String!',
		precio: 'Float',
		regreso: 'String!',
		status: 'Status',
		updatedAt: 'String!',
		user: 'String!',
	},
};
