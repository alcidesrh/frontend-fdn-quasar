import { createInput } from "@formkit/vue";
import cmp from "./text.vue";
import cmp2 from "./text_search.vue";
import BaseProps from "../BaseProps";

export const text = createInput(cmp, { props: BaseProps });
export const text_search = createInput(cmp2, { props: BaseProps });
