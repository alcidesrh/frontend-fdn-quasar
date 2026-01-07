import { createInput } from "@formkit/vue";
import cmp from "./datepicker.vue";
import BaseProps from "../BaseProps";
const input = createInput(cmp, BaseProps);
export default input;
