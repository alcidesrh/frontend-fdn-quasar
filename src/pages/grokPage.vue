<template>
  <q-page>
    <h1>Entidades</h1>
    <q-list>
      <q-item
        v-for="entity in entities"
        :key="entity"
        clickable
        @click="goToList(entity)"
      >
        {{ entity }}
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSchemaStore } from "src/stores/schemaStore";
import { getEntities } from "src/utils/schemaParser";

const schemaStore = useSchemaStore();
const entities = getEntities();
const router = useRouter();

onMounted(async () => {
  await schemaStore.fetchSchema();
});

function goToList(entity) {
  router.push({ name: "entityList", params: { entity } });
}
</script>
