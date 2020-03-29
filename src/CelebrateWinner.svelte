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

  function muteAudio() {
    document.getElementById("cheer").remove();
    this.remove();
  }
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

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1rem;
    height: 1rem;

    cursor: pointer;
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
  <audio id="cheer" autoplay>
    <source src="cheer.mp3" type="audio/mpeg" />
    <source src="cheer.ogg" type="audio/ogg" />
    Your browser does not support this audio format.
  </audio>
  <svg
    aria-hidden="true"
    data-icon="volume-mute"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    on:click={muteAudio}>
    <path
      fill="currentColor"
      d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74
      24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47
      40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64
      256l45.64-45.64c6.3-6.3 6.3-16.52
      0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416
      210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3
      16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82
      22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3
      22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" />
  </svg>
</main>

<canvas id="confetti" />

<footer>
  <Button
    handleClick={nextStep}
    text="Restart"
    autofocus
    style="--bg-color:#fff" />
</footer>
