<template>
  <div>
    {{ model }}
    <FormKit v-model="model" type="form" id="form">
      <FormKit
        type="text"
        label="FormKit Input"
        help="edit me to get started"
        validation="required"
      />
      <FormKit
        type="text"
        label="FormKit Input"
        help="edit me to get started"
        validation="required"
      />
    </FormKit>
    <button @click="resetForm">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { reset } from "@formkit/core";
import { useQuasar } from "quasar";
import languages from "quasar/lang/index.json";
import { ref, watch } from "vue";
const data = ref({ email: "yeeee" });
const modules = import.meta.glob(
  "../../node_modules/quasar/lang/(de|en-US|es).js",
);
const resetForm = () => {
  reset("form");
};
const model = ref({});
const appLanguages = languages.filter((lang) =>
  ["de", "en-US", "es"].includes(lang.isoName),
);

const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName,
}));

const $q = useQuasar();
const lang = ref($q.lang.isoName);

watch(lang, (val) => {
  modules[`../../node_modules/quasar/lang/${val}.js`]().then((lang) => {
    $q.lang.set(lang.default);
  });
});

const schema = [
  {
    $formkit: "date",
    name: "email",
    label: "Email",
    help: "This will be used for your account.",
    // validation: 'required|email',
  },
  {
    $formkit: "text",
    name: "email",
    label: "Email",
    help: "This will be used for your account.",
    // validation: 'required|email',
  },
  {
    $formkit: "select",
    name: "email",
    label: "Email",
    help: "This will be used for your account.",
    // validation: 'required|email',
  },
];
</script>
