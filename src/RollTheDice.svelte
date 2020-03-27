<script>
  import { onMount } from "svelte";

  import createSplitCircle from "./createSplitCircle.js";
  export let items, nextStep;

  const findWinner = angle => {
    const { length } = items;
    const equivalentAngle = 0.75 - (angle % 1);
    return items[(Math.floor(equivalentAngle * length) + length) % length];
  };

  onMount(() => {
    const circle = createSplitCircle(
      Math.min(window.innerHeight, window.innerWidth) * 0.9,
      items.map(item => item.color)
    );
    document.querySelector("main").append(circle);

    const pick = Math.random() * 9;
    const finalRotation = `rotate(${5 + pick}turn)`;

    if (Element.prototype.animate) {
      const animation = circle.animate(
        { transform: ["none", finalRotation] },
        {
          delay: 1000 + Math.random() * 1000,
          duration: 3000 + Math.random() * 1000,
          easing: "ease-out"
        }
      );

      animation.addEventListener("finish", () => {
        circle.style.transform = finalRotation;
        setTimeout(() => {
          nextStep(findWinner(pick));
        }, Math.random() * 1000);
      });
    } else {
      circle.style.transition = "transform 3s ease-out";
      setTimeout(() => {
        circle.style.transform = finalRotation;
      }, 1000 + Math.random() * 1000);

      circle.addEventListener("transitionend", () => {
        setTimeout(() => {
          nextStep(findWinner(pick));
        }, Math.random() * 1000);
      });
    }
  });
</script>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  main::after {
    content: "";
    display: block;
    box-sizing: content-box;
    width: 0;
    height: 0;

    position: absolute;
    top: 5vmin;
    right: 50%;
    transform: translate(50%, -50%);
    border: 3vmin solid transparent;
    border-bottom: none;
    border-top-color: #000;
  }
</style>

<main />
