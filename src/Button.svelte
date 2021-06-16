<script>
  export let handleClick = Function.prototype;
  export let text;
</script>

<style>
  button {
    border: none;
    position: relative;

    font-size: inherit;
    color: inherit;
    font-style: italic;
    font-weight: lighter;
    text-transform: uppercase;

    cursor: pointer;
    background: none;

    box-sizing: content-box;
    min-width: 10rem;
    width: 50vw;
    height: 4rem;
    line-height: 5.5rem;
    margin-top: 2rem;
    padding: 0;

    -webkit-appearance: none;
    appearance: none;

    display: flex;
    justify-content: center;
    align-items: center;

    place-self: center;
    transition: transform 100ms;
  }

  button::before {
    content: "";

    position: absolute;
    bottom: 0;
    z-index: -1;

    border-width: 0 25vw 4rem;
    border-style: solid;
    border-color: transparent;

    border-bottom-color: var(--bg-color, #000);
    transition: inherit;

    /* Safari hack */
    will-change: transform;
  }

  @media screen and (max-width: 500px) {
    button::before {
      border-width: 0 5rem 4rem;
    }
  }

  button:hover {
    transform: translateY(-0.5rem);
  }
  button:hover::before {
    transform: scaleY(1.25);
  }
  button:focus:not(:focus-visible) {
    outline: none;
  }
</style>

<button on:click={handleClick} {...$$restProps}>{text}</button>
