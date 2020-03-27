<script>
  import Button from "./Button.svelte";
  import Item from "./Item.js";
  export let items;

  function addNewItem(e) {
    items[items.length] = new Item(e.target.value);
    e.target.value = "";
    requestAnimationFrame(() =>
      e.target.form.querySelector("div:last-of-type>input").focus()
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (items.length < 2) {
      const input = e.target.querySelector("div:first-of-type>input");
      input.required = true;
      input.addEventListener(
        "input",
        () => {
          input.required = false;
        },
        { passive: true, once: true }
      );
      e.target.reportValidity();
    }
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2rem;
  }
  div > * {
    border: none;
    box-sizing: border-box;
    height: 2rem;
    width: 100%;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
  fieldset > input {
    border: none;
    box-sizing: border-box;
    height: 2rem;
    width: 100%;
  }
  fieldset:last-of-type {
    --bg-color: var(--text-color);
    color: #fff;
    justify-self: end;
    align-self: center;
  }
</style>

<main>
  <form on:submit={handleSubmit}>
    {#each items as item, index}
      <!-- Using <div> instead of <fieldset> because of Blink bug -->
      <!-- @see https://bugs.chromium.org/p/chromium/issues/detail?id=375693 -->
      <div role="group" aria-label={`Item #${index + 1}`}>
        <input aria-label="item to pick from" bind:value={item.label} />
        <!-- svelte-ignore a11y-positive-tabindex -->
        <input
          type="button"
          value="x"
          title="Delete entry"
          tabindex="1"
          style={`background-color:${item.color}`} />
      </div>
    {/each}
    <fieldset>
      <!-- svelte-ignore a11y-autofocus -->
      <input on:input={addNewItem} placeholder="Add something" autofocus />
    </fieldset>

    <fieldset>
      <Button handleClick={console.log} text="Go" type="submit" />
    </fieldset>
  </form>

</main>
