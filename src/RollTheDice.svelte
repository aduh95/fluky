<script>
  import { onMount } from "svelte";

  import createSplitCircle from "./createSplitCircle.js";
  export let items, nextStep;

  const findWinner = (angle) => {
    const { length } = items;
    const equivalentAngle = 0.75 - (angle % 1);
    return items[(Math.floor(equivalentAngle * length) + length) % length];
  };

  onMount(() => {
    const circle = createSplitCircle(
      Math.min(window.innerHeight, window.innerWidth) * 0.9,
      items.map((item) => item.color)
    );

    circle.setAttribute("aria-label", "Rolling wheel");
    for (const child of circle.children) {
      child.setAttribute("role", "presentation");
    }

    document.querySelector("main").append(circle);

    const pick = Math.random() * 14;
    const finalRotation = `rotate(${13 + pick}turn)`;

    const delay = 1000 + Math.random() * 1000;
    const duration = 6000 + Math.random() * 1000;
    const easing = "cubic-bezier(0, 0, 0.001, 1.01)";
    const delayAfterWhellStop = 300 + Math.random() * 1000;

    if (Element.prototype.animate) {
      const animation = circle.animate(
        { transform: ["none", finalRotation] },
        { delay, duration, easing }
      );

      animation.addEventListener("finish", () => {
        circle.style.transform = finalRotation;
        setTimeout(() => {
          nextStep(findWinner(pick));
        }, delayAfterWhellStop);
      });
    } else {
      circle.style.transition = `transform ${duration}ms ${easing}`;
      setTimeout(() => {
        circle.style.transform = finalRotation;
      }, delay);

      circle.addEventListener("transitionend", () => {
        setTimeout(() => {
          nextStep(findWinner(pick));
        }, delayAfterWhellStop);
      });
    }
  });
</script>

<main />

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    position: relative;
  }

  main::after {
    content: "";
    display: block;
    box-sizing: content-box;
    width: 0;
    height: 0;

    position: absolute;
    top: 5vh;
    right: 50%;
    transform: translate(50%, -50%);
    border: 3vmin solid transparent;
    border-bottom: none;
    border-top-color: var(--alt-color);
  }

  @media screen and (orientation: portrait) {
    main::after {
      top: calc(50% - 45vw - 0.5rem);
      transform: translateX(50%);
      border-width: 1rem;
    }
  }
</style>
