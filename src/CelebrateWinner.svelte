<script>
  import { onMount } from "svelte";
  import CanvasAnimation from "./CanvasAnimation.js";

  import Button from "./Button.svelte";
  export let nextStep;
  export let winner;

  onMount(() => {
    new CanvasAnimation(document.getElementById("confetti"), 2);
    document.documentElement.style.setProperty("--bg-color", winner.color);
  });
</script>

<style>
  main {
    display: flex;
    width: 100%;
    height: 100%;
    color: #fff;
  }

  h2 {
    margin: auto;

    font-family: Barrio, sans-serif;
    font-size: 3rem;
    text-decoration: underline;
    transform: rotate(-9deg);

    max-width: 90vw;
    text-align: center;

    animation: fadeIn 3s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-40px) rotate(-9deg);
    }
    to {
      opacity: 1;
    }
  }

  footer {
    font-size: 1rem;
    align-self: end;
    justify-self: center;
    color: var(--bg-color);
  }
</style>

<main>
  <h2>{winner.label}</h2>
</main>

<canvas id="confetti" />

<footer>
  <Button
    handleClick={nextStep}
    text="Restart"
    autofocus
    style="--bg-color:#fff" />
</footer>
