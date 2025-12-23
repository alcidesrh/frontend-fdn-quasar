// src/composables/useCounter.js
import { ref, computed } from "vue";

import { EventBus } from "quasar";

export const bus = new EventBus();

export const merror = (msg) => bus.emit("error", msg);

export const msuccess = (msg) => bus.emit("positive", msg);

export const minfo = (msg) => bus.emit("info", msg);

export function useBus(initialValue = 0) {
  return {
    bus,
    // merror,
    // msuccess,
    // minfo,
  };
}
