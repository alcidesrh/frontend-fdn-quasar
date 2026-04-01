import { defineStore, getActivePinia } from "pinia";
import gql from "graphql-tag";
import { router } from "@/router";
import * as queryBuilder from "gql-query-builder";
import { useCloned } from "@vueuse/core";
import { EntityModel, EntityStore } from "@/types/graphql";
import { Pagination } from "@/types/collection";
import { Dialog } from "quasar";
import Base from "@/stores/models/Base";
import persist from "./persist";
import { classMap } from "@/stores/models";
export default async (name: string) => {
  const useStore = await defineStore(name, {
    // persist: {
    //   ...persist,
    // },
    state: () => ({}),
  });

  return useStore();
};
