import { createInput } from "@formkit/vue";
import cmp from "./select.vue";
import BaseProps from "../BaseProps";
const select = createInput(cmp, BaseProps);
export default select;
