import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    state: { home: true },
  },
});

export default app;
