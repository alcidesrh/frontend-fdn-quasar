import type { User } from "~/types/user";
import { defineStore } from "pinia";
// import { parseGraphQl } from '@api-platform/api-doc-parser';
import { parseGraphQl, Resource } from "@/graphql/parse/src";
import { Query } from "~/graphql/parse/src/graphql/Query";
import { Mutation } from "~/graphql/parse/src/graphql/Mutation";
import { debounce } from "quasar";

interface State {
  mutations: Ref<Array<Mutation>>;
  queries: Ref<Array<Query>>;
  resources: Ref<Array<Resource>>;
  payload: Ref<Array<any>>;
  input: Ref<Array<any>>;
}
export const useMetadataStore = defineStore("Metadata", {
  persist: {
    afterHydrate: (ctx) => {
      console.log(
        `just hydrated '${ctx.store.$id}'-----------------------------`,
      );

      fdn.value.mutations = ctx.store.mutations;
      fdn.value.queries = ctx.store.queries;
      fdn.value.resources = ctx.store.resources;
      fdn.value.payload = ctx.store.payload;
      fdn.value.input = ctx.store.input;

      // return;
      let item;
      const routes = [],
        actions = [
          {
            name: "%Entity%",
            path: "",
            // component: () => import('~/pages/%dir%/%Entity%List.vue'),
            meta: {
              type: "%Entity%",
              action: "list",
              route: "%entity%s",
            },
          },
          {
            name: "create%Entity%",
            path: "crear",
            // component: () => import('~/pages/%dir%/%entity%Form.vue'),
            meta: {
              label: "Crear %entity%",
              // icon: 'icon-park-outline:edit',
              type: "%entity%",
              action: "create",
              route: "create%Entity%",
            },
          },
          {
            name: "update%Entity%",
            path: "edit/:id",
            // component: () => import('~/pages/%dir%/%Entity%Form.vue'),
            meta: {
              label: "Editar %entity%",
              type: "%entity%",
              action: "edit",
              route: "update%Entity%",
            },
          },
        ];
      const exclude = [
        "Edge",
        "CursorConnection",
        "PageConnection",
        "PageInfo",
        "PaginationInfo",
      ];
      for (const key in fdn.value.resources) {
        if (exclude.filter((v) => str.indexOf(key, v) > -1).length) {
          continue;
        }
        let temp = JSON.stringify(actions);
        temp = str.replaceAll(temp, "%Entity%", str.capitalize(key));
        temp = str.replaceAll(temp, "%dir%", str.lowerCase(key) + "s");
        temp = str.replaceAll(temp, "%entity%", str.lowerCase(key));
        // continue;
        item = {
          path: `${str.camelCase(key)}s`,
          children: JSON.parse(temp),

          // actions.map((v) => {
          // 	return {
          // 		name: `${str.camelCase(v[0] + key)}`,
          // 		path: `${v[1]}`,
          // 		// component: () => import('~/pages/usuarios/UserCollection.vue'),
          // 	};
          // }),
        };
        routes.push(item);
      }
    },
    beforeHydrate: (ctx) => {
      console.log(
        `about to hydrate '${ctx.store.$id}'-------------------------`,
      );
    },
  },
  state: (): State => ({
    mutations: ref([]),
    queries: ref([]),
    resources: ref([]),
    payload: ref([]),
    input: ref([]),
  }),
  actions: {
    async setApiMetadata(force = false) {
      const aux = (a: {}, i: number = 0, f: number = -1) => {
        let c = -1;
        const o = {};
        for (const [key, value] of Object.entries(a)) {
          c++;
          if (c < i) {
            continue;
          } else if (f > -1 && c > f) {
            break;
          }
          o[key] = value;
        }
        return o;
      };

      if (!Object.keys(this.mutations).length || force) {
        gloading.value = true;
        return await parseGraphQl(ENTRYPOINT_GRAPHQL).then(
          ({ resources, queries, mutations, payload, input }: any) => {
            this.mutations = aux(mutations);
            this.queries = aux(queries);
            this.resources = aux(resources);
            this.payload = aux(payload);

            fdn.value.mutations = this.mutations;
            fdn.value.queries = this.queries;
            fdn.value.resources = this.resources;
            fdn.value.payload = this.payload;
            fdn.value.input = this.input;

            gloading.value = false;
          },
        );

        // .catch((e) => {
        // 	// this.api = getApiResources();
        // });
      }
      // api.value.api = this.api;
    },
  },
  getters: {
    loaded: (state) => state.queries.length !== 0,
  },
});
