<script>
  export let handleClick;
  export let text;
</script>

<style>
  button {
    border: none;
    position: relative;

    font-size: inherit;
    color: currentColor;
    text-transform: uppercase;
    cursor: pointer;

    background: none;
    padding: 0;

    box-sizing: content-box;
    width: 50vw;
    height: 4rem;

    -webkit-appearance: none;
    appearance: none;

    display: flex;
    justify-content: center;
    align-items: center;

    place-self: center;
  }

  button::before {
    content: "";

    position: absolute;
    bottom: 0;
    z-index: -1;

    border-width: 0 25vw 4rem;
    border-style: solid;
    border-color: transparent;

    border-bottom-color: var(--color, #6ed2a0);
    transition: border-bottom-width 100ms;
  }

  button:hover::before {
    border-bottom-width: 5rem;
  }
</style>

<button on:click={handleClick}>{text}</button>
