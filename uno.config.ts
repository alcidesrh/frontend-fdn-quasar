import {
  defineConfig,
  presetUno,
  presetAttributify,
  Rule,
  presetWind4,
} from "unocss";
import { utopia_rules, color_rules } from "./src/utils/unocss_rules";

export default defineConfig({
  rules: [
    ...(utopia_rules as Rule<object>[]),
    ...(color_rules as Rule<object>[]),
  ],
  presets: [presetUno(), presetAttributify(), presetWind4()],
});
