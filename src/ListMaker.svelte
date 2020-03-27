<script>
  import Button from "./Button.svelte";
  import Item from "./Item.js";
  export let items;

  let antiRebound = 0;

  function addNewItem(e) {
    if (antiRebound === 0) {
      const item = new Item(e.target.value);
      items[items.length] = item;
      antiRebound = requestAnimationFrame(() => {
        const newInputElement = e.target.form.querySelector(
          "div:last-of-type>input:last-child"
        );
        item.label = e.target.value;
        e.target.value = "";
        antiRebound = 0;

        newInputElement.focus();
      });
    }
  }

  function deleteItem(i) {
    return e => {
      const [item] = items.splice(i, 1);
      items = items;
      item.remove();
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (items.length < 2) {
      const input = e.target.querySelector("fieldset:first-of-type>input");
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
  div > :first-child {
    order: 1;
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
    margin-top: auto;
    align-self: center;
  }
</style>

<main>
  <form on:submit={handleSubmit}>
    {#each items as item, index}
      <!-- Using <div> instead of <fieldset> because of Blink bug -->
      <!-- @see https://bugs.chromium.org/p/chromium/issues/detail?id=375693 -->
      <div role="group" aria-label={`Item #${index + 1}`}>
        <input
          type="button"
          value="x"
          on:click={deleteItem(index)}
          title="Delete entry"
          style={`background-color:${item.color}`} />
        <input
          aria-label="Describe the item"
          required
          bind:value={item.label} />
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
