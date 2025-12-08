<template>
  <q-page class="row items-center justify-evenly">
    <icon name="grid_view" size="40" wght="100" />
    <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

apollo
  .query({
    operation: 'collectionAgnostic',
    fields: ['data'],
    variables: { resource: 'User' },
  })
  .then(({ data, networkStatus }) => {
    if (typeof data == 'undefined' && networkStatus == 1) {
      return;
    }
    cls(data.collectionAgnostic.data.collection);
  })
  .catch((error) => { cle(error) });

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);

const meta = ref<Meta>({
  totalCount: 1200
});
</script>
