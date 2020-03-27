<script>
  import Button from "./Button.svelte";
  export let nextStep;
  export let winner;
</script>

<style>
  main {
    display: flex;
    width: 100%;
    height: 100%;
    text-align: center;
    color: var(--text-color);
  }

  footer {
    --bg-color: var(--text-color);
    font-size: 1rem;
    align-self: end;
    justify-self: center;
    color: white;
  }
</style>

<main style={`--text-color: ${winner.color}`}>{winner.label}</main>

<footer>
  <Button handleClick={nextStep} text="Restart" autofocus />
</footer>
