<script>
  import Home from "./Home.svelte";
  export let state;

  function switchToFillItemScreen() {
    state.home = false;
    state.fillItems = true;
  }
</script>

{#if state.home}
  <Home {switchToFillItemScreen} />
{:else if state.fillItems}
  <p>TBD</p>
{/if}
