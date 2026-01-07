<template>
  <q-select v-model="lang" :options="langOptions" label="Quasar Language" dense borderless emit-value map-options
    options-dense style="min-width: 150px" />
  <div>{{ $q.lang.label.close }}</div>
  <FormKit type="form" v-model="data" @submit="register">
    <FormKitSchema :schema="schema" />
  </FormKit>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { ref, watch } from 'vue'
const data = ref({ email: 'yeeee' });
const modules = import.meta.glob('../../node_modules/quasar/lang/(de|en-US|es).js')

const appLanguages = languages.filter(lang =>
  ['de', 'en-US', 'es'].includes(lang.isoName)
)

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}))


const $q = useQuasar()
const lang = ref($q.lang.isoName)

watch(lang, val => {
  modules[`../../node_modules/quasar/lang/${val}.js`]().then(lang => {
    $q.lang.set(lang.default)
  })
})




const schema = [
  {
    $formkit: 'date',
    name: 'email',
    label: 'Email',
    help: 'This will be used for your account.',
    // validation: 'required|email',
  },
  {
    $formkit: 'text',
    name: 'email',
    label: 'Email',
    help: 'This will be used for your account.',
    // validation: 'required|email',
  },
  {
    $formkit: 'select',
    name: 'email',
    label: 'Email',
    help: 'This will be used for your account.',
    // validation: 'required|email',
  }
]
</script>
