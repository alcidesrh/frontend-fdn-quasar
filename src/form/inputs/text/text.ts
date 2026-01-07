import { createInput } from "@formkit/vue";
import cmp from "./text.vue";
import BaseProps from "../BaseProps";
const text_custom = createInput(cmp, BaseProps);
export default text_custom;
