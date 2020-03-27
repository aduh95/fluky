<script>
  import Home from "./Home.svelte";
  import ListMaker from "./ListMaker.svelte";
  export let state;

  const items = [];

  function switchToFillItemScreen() {
    state.home = false;
    state.fillItems = true;
  }
</script>

{#if state.home}
  <Home {switchToFillItemScreen} />
{:else if state.fillItems}
  <ListMaker {items} />
{/if}
