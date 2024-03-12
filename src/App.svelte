<script>
  import Home from "./Home.svelte";
  import ListMaker from "./ListMaker.svelte";
  import RollTheDice from "./RollTheDice.svelte";
  import CelebrateWinner from "./CelebrateWinner.svelte";
  export let state;

  const items = [];

  try {
    items.push(...JSON.parse(decodeURIComponent(location.hash?.slice(1))));
  } catch {}

  addEventListener("hashchange", () => {
    try {
      const newItems = JSON.parse(decodeURIComponent(location.hash?.slice(1)));
      if (Array.isArray(newItems)) {
        items.splice(0, items.length, ...newItems);
        state.home = false;
        state.fillItems = true;
        state.rollTheDice = false;
        state.celebrateWinner = false;
        document.documentElement.style.removeProperty("--bg-color");
      }
    } catch {}
  });

  function switchToFillItemScreen() {
    state.home = false;
    state.fillItems = true;
  }

  function switchToRollTheDice() {
    location.hash = encodeURIComponent(JSON.stringify(items));
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
    state.fillItems = true;
    document.documentElement.style.removeProperty("--bg-color");
  }
</script>

{#if state.home}
  <Home nextStep={switchToFillItemScreen} />
{:else if state.fillItems}
  <ListMaker {items} nextStep={switchToRollTheDice} />
{:else if state.rollTheDice}
  <RollTheDice {items} nextStep={switchToWinScreen} />
{:else if state.celebrateWinner}
  <CelebrateWinner winner={state.winner} nextStep={backToItemScreen} />
{/if}
