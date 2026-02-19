// import { genesisIcons } from '@formkit/icons'
import { es } from "@formkit/i18n";
import { generateClasses } from "@formkit/themes";
import { defineFormKitConfig } from "@formkit/vue";
import { rootClasses } from "@/form/formkit.theme";
import * as inputs from "@/form/inputs";
import addAsteriskPlugin from "@/form/plugins/addAsterisk";
import scrollToErrors from "@/form/plugins/scrollToErrors";
import createAutoAnimatePlugin from "@/form/plugins/animate";
import filterProps from "@/form/plugins/filterProps";

export default {
  locale: "es",
  locales: { es },
  // icons: { ...genesisIcons },
  config: {
    rootClasses,
    classes: generateClasses({
      global: {
        label: "whitespace-nowrap",
      },
      // text: simpleInputClasses,
      // number: simpleInputClasses,
      // password: simpleInputClasses,
    }),
  },
  inputs,

  plugins: [
    addAsteriskPlugin,
    scrollToErrors,
    createAutoAnimatePlugin(),
    // filterProps,
    // createLoadingSpinnerPlugin(),
  ],
};
