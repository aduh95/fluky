<script>
  import { onMount } from "svelte";
  import CanvasAnimation from "./CanvasAnimation.js";

  import Button from "./Button.svelte";
  export let nextStep;
  export let winner;

  onMount(() => new CanvasAnimation(document.getElementById("confetti"), 1.5));
</script>

<style>
  main {
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--text-color);
  }

  h2 {
    margin: auto;

    font-family: Barrio, sans-serif;
    font-size: 3rem;
    text-decoration: underline;
    transform: rotate(-9deg);

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
    color: white;
  }
</style>

<main style={`--text-color: ${winner.color}`}>
  <h2>{winner.label}</h2>
</main>

<canvas id="confetti" />

<footer style={`--bg-color: ${winner.color}`}>
  <Button handleClick={nextStep} text="Restart" autofocus />
</footer>
