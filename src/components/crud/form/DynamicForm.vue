<template>
  <div class="h-full w-full @container">
    <div v-if="schema.length" class="form-container">
      <FormKit
        id="form"
        ref="form"
        type="form"
        @submit="submit"
        v-model="defaultValue"
        :actions="false"
      >
        <FormKitSchema :schema="schema" :data="data" :library="library">
          <template #crudBtn>
            <div class="flex flex-wrap justify-end gap-5 align-middle">
              <slot name="CrudButton">
                <CrudButton
                  :edit="!!entity.item?.id"
                  @submit="submit"
                  @delete="store.remove()"
                  @cancel="
                    $router.push({
                      name: 'list',
                      params: { entity: entity.name, id: entity.item?.id },
                    })
                  "
                />
              </slot>
            </div>
          </template>
        </FormKitSchema>
      </FormKit>
    </div>
    <div v-else class="w-full">
      <FormPreload :cols="2" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Store } from "pinia";
import { FormKitMessages } from "@formkit/vue";
import { markRaw } from "vue";
import { useRouter } from "vue-router";
import { reset } from "@formkit/core";
import { clearErrors } from "@formkit/vue";
import { Entity } from "@/models/useEntityFactory";

const route = useRouter();

interface Props {
  // store: Store;
  columns?: number;
}
const { columns = 3 } = defineProps<Props>();

const store = useCurrentEntityStore();

const library = markRaw({
  FormKitMessages: FormKitMessages,
});

const { schema, entity } = storeToRefs(store.value) as Record<
  "entity",
  Ref<Entity>
>;
const form = ref(null);
store.value.setFormkitSchema(route.currentRoute.value.params?.id);

const defaultValue = ref({});
watch(
  () => entity.value.item,
  (v) => {
    defaultValue.value = v;
  },
);
const resetForm = ref(false);
function submit(data) {
  if (data == "reset") {
    resetForm.value = true;
    form.value.node.submit();
    return;
  }
  store.value
    .submit(data)
    .then((data) => {
      msuccess();
      if (resetForm.value) {
        resetForm.value = false;
        if (router.currentRoute.value.name == entity.value.endpoints.create) {
          reset("form", {});
        } else {
          router.push({ name: entity.value.endpoints.create });
        }
        return;
      }
      router.push({ name: entity.value.endpoints.collection });
    })
    .catch((e) => {});
  // form.value.node.submit();
}

const data = ref({
  localidades: [], //items,
  parents: [],
  children: [],
  permisos: [],
  actions: [],
  roles: [],

  item: computed(() => entity.value.item),
  // submit: (data) => store.submit(data),
});
// onBeforeMount(() => {
// 	const eventSource = new EventSource(
// 		'http://localhost/.well-known/mercure?topic=form'
// 	);

// 	eventSource.onmessage = (event) => {
// 		schema2.value = [JSON.parse(event.data).schema];
// 	};

// 	const eventSource2 = new EventSource(
// 		'http://localhost/.well-known/mercure?topic=item'
// 	);

// 	eventSource.onmessage = (event) => {
// 		schema2.value = [JSON.parse(event.data).schema];
// 	}; });
</script>
