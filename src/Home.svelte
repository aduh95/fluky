<script>
  import { onMount } from "svelte";
  import CanvasAnimation from "./CanvasAnimation.js";

  import Button from "./Button.svelte";
  export let nextStep;

  onMount(
    () =>
      new CanvasAnimation(document.getElementById("confetti"), 0.12, "#95dbb7")
  );
</script>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem 0.25rem;
    margin: 0 auto;

    place-self: center;
    animation: fadeIn 800ms ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-60px);
    }
    to {
      opacity: 1;
    }
  }

  h1,
  h4 {
    text-transform: uppercase;
    transform: rotate(-9deg);
    margin: 0;
    width: fit-content;
  }

  h1 {
    font-size: 4rem;
    line-height: 4rem;
    font-style: italic;
    padding: 0.5rem 0;
    transform-origin: bottom;
  }

  h4 {
    font-size: 1rem;
    line-height: 1rem;
    padding: 0.8rem 0;
    border: 5px solid currentColor;
    border-right: none;
    border-left: none;
    transform-origin: top;
  }
  p {
    margin-top: 2rem;
    text-align: center;
    font-family: Anago, Arial, sans-serif;
    font-size: 0.66rem;
  }
  a {
    color: inherit;
    text-decoration: underline;
  }

  footer {
    --bg-color: var(--text-color);
    font-size: 1rem;
    align-self: end;
    justify-self: center;
    color: white;
  }
</style>

<header>
  <h1>Fluky</h1>
  <h4>Anything could happen</h4>
  <p>
    This web app is a reproduction of
    <a href="http://fluky.io">Fluky</a>
    – a randomizer by
    <a href="https://humblebee.se/">Humblebee</a>
    – made as an exercise by
    <a href="https://github.com/aduh95">aduh95</a>
  </p>
</header>

<canvas id="confetti" />

<footer>
  <Button handleClick={nextStep} text="Start" autofocus />
</footer>
