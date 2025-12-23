export const { bus: b } = useBus();

export const merror = (msg) => b.emit("error", msg);

export const msuccess = (msg) => b.emit("positive", msg);

export const minfo = (msg) => b.emit("info", msg);

export const bus = b;
