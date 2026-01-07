<template>
  <q-input outlined v-model="date" class="w-full" dense>
    <template v-slot:prepend>
      <q-icon name="sym_o_event" class="cursor-pointer text-slate-5" size="20px">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Aceptar" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="sym_o_access_time" class="cursor-pointer text-slate-5" size="20px">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      date: ref('')
    }
  }
}
</script>
