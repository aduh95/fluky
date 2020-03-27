<script>
  export let handleClick = Function.prototype;
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
    min-width: 200px;
    width: 50vw;
    height: 3rem;

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
    transition: transform 100ms;
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
</style>

<button on:click={handleClick} {...$$restProps}>{text}</button>
