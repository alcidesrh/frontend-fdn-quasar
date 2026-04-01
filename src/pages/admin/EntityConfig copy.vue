<template>
  <q-page class="q-pa-md">
    <q-table
      :rows="entities"
      :columns="columns"
      row-key="id"
      title="Configuración de Entidades"
      :loading="loading"
    >
      <template #body="{ row }">
        <q-tr>
          <q-td>{{ row.entityClass.split("\\").pop() }}</q-td>
          <q-td>
            <q-btn
              color="primary"
              icon="edit"
              label="Editara"
              @click="openEditor(row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Drawer -->
    <q-drawer
      v-model="drawerOpen"
      side="right"
      :width="1100"
      bordered
      persistent
      overlay
    >
      <EntityConfigurationEditor
        v-if="selectedId"
        :config-id="selectedId"
        @close="drawerOpen = false"
      />
    </q-drawer>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEntityConfig } from "src/composables/useEntityConfig";
import EntityConfigurationEditor from "src/components/admin/EntityConfigurationEditor.vue";

const { fetchAllConfigs } = useEntityConfig();
const entities = ref<any[]>([]);
const loading = ref(false);
const drawerOpen = ref(false);
const selectedId = ref<number | null>(null);

const columns = [
  { name: "entity", label: "Entidad", field: "entityClass" },
  { name: "actions", label: "Acciones", style: "width: 150px" },
];

onMounted(async () => {
  loading.value = true;
  entities.value = await fetchAllConfigs();
  loading.value = false;
});

const openEditor = (id: number) => {
  alert(id);
  selectedId.value = id;
  drawerOpen.value = true;
};
</script>
