<script>
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { base } from "$app/paths";
  import Background from "$lib/background.svelte";
  import { onMount } from "svelte";

  export let color = "white";
  export let mixBlendMode = "difference";
  export let height = 10;
  export let width = 10;
  export let radius = -50;
  export let shape = "circle(50% at 50% 50%)";
  export let trans = "all 0s cubic-bezier(0.28, 0.8, 0.36, 1)";

  let x = -100;
  let y = -100;

  const cx = height / 2;
  const cy = width / 2;

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  onMount(() => {
    if (!isMobile()) {
      const initCursor = () => {
        document.addEventListener("mousemove", (e) => {
          x = e.clientX;
          y = e.clientY;
        });
        const hoverables = document.querySelectorAll(".hover, .shortcut");
        hoverables.forEach((hoverable) => {
          hoverable.addEventListener("mouseenter", () => {
            shape = "polygon(0% 0%, 10% 90%, 28% 55%, 70% 50%)";
            height += 10;
            width += 10;
            trans = "all 0s cubic-bezier(0.28, 0.8, 0.36, 1)";
            document.body.style.cursor = "none";
          });
          hoverable.addEventListener("mouseleave", () => {
            trans = " all 0s cubic-bezier(0.28, 0.8, 0.36, 1)";
            shape = "circle(50% at 50% 50%)";
            height -= 10;
            width -= 10;
          });
        });
      };

      initCursor();
    }
  });
  let currentTheme = "";

  onMount(() => {
    const userPrefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const hasUserSetDarkModeManually =
      document.documentElement.dataset.theme == "dark";

    if (!hasUserSetDarkModeManually) {
      setTheme(userPrefersDarkMode ? "dark" : "light");
    }
  });

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.cookie = `siteTheme=${theme};domain=.salanileo.dev; path=/`;
    currentTheme = theme;
  };
</script>

<p id="mobiletopbar" />
<h1 class="title">SalaniLeo's Weather</h1>
<div class="darker outline" id="navbar">
  <a class="shortcut" id="home" href={base + "/"}
    ><i class="fa-solid fa-house" /></a
  >
  <a class="shortcut" id="radar" href={base + "/globe"}
    ><i class="fa-solid fa-satellite-dish" /></a
  >
  <a class="shortcut" id="tempmap" href={base + "/temperatures"}
    ><i class="fa-solid fa-temperature-half" /></a
  >

  <p />

  <a class="shortcut bottom" id="github" href="https://www.github.com/salaniLeo"
    ><i class="fa-brands fa-github" /></a
  >
  <a
    class="shortcut bottom"
    id="info"
    style="cursor: none;"
    href={base + "/about"}><i class="fa-solid fa-circle-info" /></a
  >
  {#if currentTheme == "light"}
    <a class="moon icon" href={"#"} on:click={() => setTheme("dark")}>
      <img
        src={base + "/icons/sun.png"}
        alt="theme"
        class="shortcut"
        style="height: 30px;"
      />
    </a>
  {:else}
    <a class="sun icon" href={"#"} on:click={() => setTheme("light")}>
      <img
        src={base + "/icons/moon.png"}
        alt="theme"
        class="shortcut"
        style="height: 30px;"
      />
    </a>
  {/if}
</div>
<div
  class="custom-cursor"
  style="left: {x - cx}px; 
  top: {y - cy}px;
  --width:{width}px;
  --height:{height}px;
  --border-radius:{radius};
  --mix-blend-mode: {mixBlendMode};
  --background-color: {color};
  --shape: {shape};
  --trans: {trans}"
/>

<!-- <Background /> -->
<slot />

<style>
  .custom-cursor {
    --background-color: "black";
    --mix-blend-mode: "difference";
    --width: 10;
    --height: 10;
    --shape: circle(50% at 50% 50%);
    --trans: all 0s cubic-bezier(0.28, 0.8, 0.36, 1);
    background-color: var(--background-color);
    mix-blend-mode: var(--mix-blend-mode);
    width: var(--width);
    height: var(--height);
    position: fixed;
    pointer-events: none;
    z-index: 99999;
    clip-path: var(--shape);
    /* Customize your cursor styles here */
    transition: var(--trans);
    cursor: none;
  }
</style>
