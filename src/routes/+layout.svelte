<script>
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { base } from "$app/paths";
  import Background from "$lib/background.svelte";
  import { onMount } from "svelte";
  import {
    getCookie,
    refreshrate,
    setCookie,
    setLocation,
    setRefreshRate,
    location,
  } from "$lib";

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

  // onMount(() => {
  //   if (!isMobile()) {
  //     const initCursor = () => {
  //       document.addEventListener("mousemove", (e) => {
  //         x = e.clientX;
  //         y = e.clientY;
  //       });
  //       const hoverables = document.querySelectorAll(".hover, .shortcut");
  //       hoverables.forEach((hoverable) => {
  //         hoverable.addEventListener("mouseenter", () => {
  //           shape = "polygon(0% 0%, 10% 90%, 28% 55%, 70% 50%)";
  //           height += 10;
  //           width += 10;
  //           trans = "all 0s cubic-bezier(0.28, 0.8, 0.36, 1)";
  //           document.body.style.cursor = "none";
  //         });
  //         hoverable.addEventListener("mouseleave", () => {
  //           trans = " all 0s cubic-bezier(0.28, 0.8, 0.36, 1)";
  //           shape = "circle(50% at 50% 50%)";
  //           height -= 10;
  //           width -= 10;
  //         });
  //       });
  //     };

  //     initCursor();
  //   }
  // });
  let currentTheme = "light";

  onMount(() => {
    if (getCookie("theme") != null) {
      currentTheme = getCookie("theme");
      document.documentElement.dataset.theme == currentTheme;
      setTheme(currentTheme, false);
    }
  });

  const setTheme = (theme, save) => {
    document.documentElement.dataset.theme = theme;
    currentTheme = theme;
    if (save) setCookie("theme", theme);
  };
  import Modal from "../lib/Modal.svelte";

  let showModal = false;
  let refreshratetmp = refreshrate;
  let locationtmp = location;
</script>

<h1 class="title">SalaniLeo's Weather</h1>
<button
  id="settingsBtn"
  class="container hover"
  style="padding: 7px; !important"
  on:click={() => (showModal = true)}
>
  <i class="fa-solid fa-gear"></i>
</button>

<Modal bind:showModal>
  <h2 slot="header">
    Settings <i
      class="fa-solid fa-circle"
      style="scale: 40%; top: 3px; position: relative;"
    ></i>
    <i
      class="fa-solid fa-arrow-turn-up"
      style="rotate: 90deg; top: 5px; position: relative; margin-left: 5px; margin-right: 5px"
    ></i> to apply
  </h2>
  <div id="grid">
    <div class="settingsGrid">
      <p>Map refresh rate (ms):</p>
      <p>Location:</p>
    </div>
    <div class="settingsGrid">
      <form
        class="textInput"
        on:submit|preventDefault={() => setRefreshRate(refreshratetmp)}
      >
        <input type="text" class="textInput" bind:value={refreshratetmp} />
      </form>
      <form
        class="textInput"
        on:submit|preventDefault={() => setLocation(locationtmp)}
      >
        <input type="text" class="textInput" bind:value={locationtmp} />
      </form>
    </div>
  </div>
</Modal>

<div class="darker container" id="navbar" style="box-shadow: unset;">
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
    <a class="moon icon" href={"#"} on:click={() => setTheme("dark", true)}>
      <img
        src={base + "/icons/sun.png"}
        alt="theme"
        class="shortcut"
        style="height: 30px;"
      />
    </a>
  {:else}
    <a class="sun icon" href={"#"} on:click={() => setTheme("light", true)}>
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
  .settingsGrid {
    padding-right: 10px;
  }
</style>
