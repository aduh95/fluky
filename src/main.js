import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    state: { home: true },
  },
});

const fixBodyHeight = () => {
  // Safari iOS address bar may make the body longer than the screen
  document.body.style.maxHeight = window.innerHeight + "px";
};
addEventListener("resize", fixBodyHeight, { passive: true });

export default app;
