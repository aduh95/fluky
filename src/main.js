import App from "./App.svelte";
import "service-worker:./sw.js";

const app = new App({
  target: document.body,
  props: {
    state: { home: true },
  },
});

export default app;
