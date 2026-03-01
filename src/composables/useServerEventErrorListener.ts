import { tabId } from "@/boot/apollo";

export function useServerEventErrorListener() {
  const eventSource = new EventSource(
    "http://localhost/.well-known/mercure?topic=error_tab" + tabId,
  );

  eventSource.onmessage = (event) => {
    merror(JSON.parse(event.data));
  };
}
