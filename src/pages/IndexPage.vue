<template>
  <q-page class="row items-center justify-evenly ">
    <div class="q-pa-md q-gutter-sm">
      <icon name="search" />
      <q-icon name="search" />
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input v-model="text" label="Standard" />

          <q-input filled v-model="text" label="Filled" />

          <q-input outlined v-model="text" label="Outlined" />

          <q-input standout v-model="text" label="Standout" />

          <q-input standout="bg-teal text-white" v-model="text" label="Custom standout" />

          <q-input borderless v-model="text" label="Borderless" />

          <q-input rounded filled v-model="text" label="Rounded filled" />

          <q-input rounded outlined v-model="text" label="Rounded outlined" />

          <q-input rounded standout v-model="text" label="Rounded standout" />

          <q-input square filled v-model="text" label="Square filled" />

          <q-input square outlined v-model="text" label="Square outlined" />

          <q-input square standout v-model="text" label="Square standout" />
        </div>
      </div>
    </div>
    <icon name="grid_view" size="40" wght="100" />
    <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'; ` `
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';


const text = ref('')
const customize = [
  {
    label: 'Satisfied customers',
    header: 'root',
    children: [
      {
        label: 'Good food',
        icon: 'search',
        header: 'generic',
        children: [
          {
            label: 'Quality ingredients',
            header: 'generic',
            body: 'story',
            story: 'Lorem ipsum dolor sit amet.'
          },
          {
            label: 'Good recipe',
            body: 'story',
            story: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.'
          }
        ]
      },
      {
        label: 'Good service',
        header: 'generic',
        body: 'toggle',
        caption: 'Why are we as consumers so captivated by stories of great customer service? Perhaps it is because...',
        enabled: false,
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' }
        ]
      },
      {
        label: 'Pleasant surroundings',
        children: [
          { label: 'Happy atmosphere' },
          { label: 'Good table presentation', header: 'generic' },
          { label: 'Pleasing decor' }
        ]
      }
    ]
  }
]
// apollo
//   .query({
//     operation: 'collectionAgnostic',
//     fields: ['data'],
//     variables: { resource: 'User' },
//   })
//   .then(({ data, networkStatus }) => {
//     if (typeof data == 'undefined' && networkStatus == 1) {
//       return;
//     }
//     cls(data.collectionAgnostic.data.collection);
//   })
//   .catch((error) => { cle(error) });

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
