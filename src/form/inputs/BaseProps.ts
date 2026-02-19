export default {
  modelValue: {
    type: null,
    default: undefined,
  },
  validation: {
    type: String,
    default: undefined,
  },
  defaultValue: {
    type: null,
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
  },
  invalid: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    default: null,
  },
  variant: {
    type: String,
    default: null,
  },
  eventbus: {
    type: [String],
    default: null,
  },
  inputType: {
    type: String,
    default: "text",
  },
};
