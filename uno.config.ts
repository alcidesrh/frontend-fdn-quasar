import {
  defineConfig,
  presetUno,
  presetAttributify,
  Rule,
  transformerDirectives,
  transformerVariantGroup,
  presetWind4,
} from "unocss";
import { utopia_rules, color_rules } from "./src/utils/unocss_rules";
import { presetUtopia } from "@azbestoid/unocss-preset-utopia-core";

export default defineConfig({
  rules: [
    ...(utopia_rules as Rule<object>[]),
    ...(color_rules as Rule<object>[]),
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    // presetWind4(),
    presetUtopia({
      // Viewport configuration
      minWidth: 320,
      maxWidth: 1240,

      // Typography scale
      minFontSize: 10,
      maxFontSize: 16,
      minTypeScale: 1.2,
      maxTypeScale: 1.25,
      positiveSteps: 5,
      negativeSteps: 2,

      // Spacing scale
      minSpaceSize: 18,
      maxSpaceSize: 20,
      positiveSpaceSteps: [1.5, 2, 3, 4, 6],
      negativeSpaceSteps: [0.75, 0.5, 0.25],
      customSpaceSizes: ["s-l", "xl-3xl"],

      // Container queries support
      relativeTo: "viewport", // or 'container'
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      include: [
        "src/form/formkit.theme.ts",
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        "src/utils/**/*.{ts,js,vue}",
        "src/composables/**/*.{ts,js,vue}",
        "src/stores/**/*.{ts,js,vue}",
        "src/pages/**/*.{ts,js,vue}",
        "src/layouts/**/*.{ts,js,vue}",
        "src/components/**/*.{ts,js,vue}",
      ],
      // exclude files
      // exclude: []
    },
    filesystem: [
      // 'layers/**/*.{js,ts.vue}',
      // 'layers/auth/components/form/*.{ts,js,vue}',
      // 'composables/**/*.{ts,js,vue}',
      // './pages/**/*.{ts,js,vue}',
      // './node_modules/@primevue/**/*.{vue,js,ts,jsx,tsx}'
    ],
  },
});
