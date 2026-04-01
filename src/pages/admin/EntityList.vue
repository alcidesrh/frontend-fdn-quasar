<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item
        v-for="(v, i) in entities"
        :key="i"
        clickable
        v-ripple
        @click="
          $router.push({
            name: 'entity_config',
            params: { entity: v.name, action: 'editar' },
          })
        "
      >
        <q-item-section class="u-text-1 font-500">{{ v.name }}</q-item-section>
        <q-item-section class="text-end">
          <icon name="edit" class="text-surface-6" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Item with overline</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
