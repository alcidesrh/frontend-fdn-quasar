import type { Field } from '../Field.js';
import { assignSealed } from '../utils/assignSealed.js';

class ResourceBase {
	constructor() {}
	resourceFields(key, exclude = ['label'] as Array<string>) {
		if (typeof this.api[key] == undefined) {
			throw new TypeError(`No existe el recurso${key}`);
		}
		return this.api[key].fields
			.filter((i: Record<'name', string>) => !exclude.includes(i.name))
			.map((i) => {
				if (['String', 'ID', 'Iterable', 'Int', 'Status'].includes(i.type)) {
					return i.name;
				} else if (i.reference) {
					const temp = {};
					temp[i.name] = ['id', 'nombre'];
					return temp;
				} else {
					const temp = {};
					temp[i.name] = [{ collection: ['id', 'nombre'] }];
					return temp;
				}
				// else {
				// }
			});
	}
}
export class Resource extends ResourceBase {
	constructor(public name: string, public fields: Field[], options: any = {}) {
		super();
		assignSealed(this, options);
	}
}
