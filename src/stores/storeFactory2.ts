import { defineStore, getActivePinia } from "pinia";
import gql from "graphql-tag";
import { router } from "@/router";
import * as queryBuilder from "gql-query-builder";
import { useCloned } from "@vueuse/core";
import { EntityModel, EntityStore } from "@/types/graphql";
import { Pagination } from "@/types/collection";
import { Dialog } from "quasar";
import Api from "@/stores/models/Api";
import persist from "./persist";

export default async (key: string) => {
  const type = entities.value[key];
  const nameDecapitalize = str.decapitalize(key);
  const storeId = `${nameDecapitalize}Store`;

  const model =
    typeof classMap[type.name] != "undefined"
      ? new classMap[type.name](type.name)
      : new Api(type.name);
  return await defineStore(storeId, model.getStore());
};
