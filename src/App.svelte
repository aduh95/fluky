<script>
  import Home from "./Home.svelte";
  import ListMaker from "./ListMaker.svelte";
  import RollTheDice from "./RollTheDice.svelte";
  import CelebrateWinner from "./CelebrateWinner.svelte";
  export let state;

  const items = [];

  function switchToFillItemScreen() {
    state.home = false;
    state.fillItems = true;
  }

  function switchToRollTheDice() {
    state.fillItems = false;
    state.rollTheDice = true;
  }

  function switchToWinScreen(winner) {
    state.rollTheDice = false;
    state.celebrateWinner = true;
    state.winner = winner;
  }

  function backToItemScreen() {
    state.celebrateWinner = false;
    items.splice(0, items.length);
    state.fillItems = true;
  }
</script>

{#if state.home}
  <Home nextStep={switchToFillItemScreen} />
{:else if state.fillItems}
  <ListMaker {items} nextStep={switchToRollTheDice} />
{:else if state.rollTheDice}
  <RollTheDice {items} nextStep={switchToWinScreen} />
{:else if state.celebrateWinner}
  <div>{state.winner.label}</div>
{/if}
