<script>
  //   export let name;
</script>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
    margin: 0 auto;
    place-self: center;
  }

  h1,
  h4 {
    color: #6ed2a0;
    text-transform: uppercase;
    transform: rotate(-9deg);
    margin: 0;
    width: fit-content;
  }

  h1 {
    font-size: 4rem;
    font-style: italic;
  }

  h4 {
    font-size: 1rem;
    border: 5px solid #6ed2a0;
    border-right: none;
    border-left: none;
  }
  p {
    margin-top: 2rem;
    text-align: center;
    font-family: Anago, Arial, sans-serif;
    font-size: 0.66rem;
    color: #6ed2a0;
  }
  a {
    color: inherit;
    text-decoration: underline;
  }
</style>

<header>
  <h1>Fluky</h1>
  <h4>Anything could happen</h4>
  <p>
    This web app is a reproduction of
    <a href="http://fluky.io">Fluky</a>
    – a randomizer by
    <a href="https://humblebee.se/">Humblebee</a>
    – made as an exercise by
    <a href="https://github.com/aduh95">aduh95</a>
  </p>
</header>
