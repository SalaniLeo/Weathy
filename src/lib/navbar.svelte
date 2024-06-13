<script>
  // @ts-nocheck
  import { base } from "$app/paths";
  import { setTheme, currentTheme } from "$lib";
</script>

<!-- Navigation -->
<nav class="darker">
  <div id="top">
    <a class="navElement" id="home" href={base + "/"}
      ><i class="fa-solid fa-house" /></a
    >
    <div class="spacer">|</div>
    <a class="navElement" id="radar" href={base + "/globe"}
      ><i class="fa-solid fa-satellite-dish" /></a
    >
    <div class="spacer">|</div>
    <a class="navElement" id="tempmap" href={base + "/temperatures"}
      ><i class="fa-solid fa-temperature-half" /></a
    >
  </div>

  <div id="center">
    <a href="https://salanileo.dev">Made by SalaniLeo</a>
  </div>

  <div id="bottom">
    <a class="navElement" id="info" href={base + "/about"}
      ><i class="fa-solid fa-circle-info" /></a
    >
    <div class="spacer">|</div>
    <a class="navElement" id="github" href="https://www.github.com/salaniLeo"
      ><i class="fa-brands fa-github" /></a
    >
    <div class="spacer">|</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#if $currentTheme == "light"}
      <i
        class="fa-regular fa-sun navElement"
        style="transform: translateY(-2px);"
        on:click={() => setTheme("dark", true)}
      ></i>
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <i
        class="fa-regular fa-moon navElement"
        style="transform: translateY(-2px);"
        on:click={() => setTheme("light", true)}
      ></i>
    {/if}
  </div>
</nav>

<style>
  nav {
    box-shadow: var(--shadow-color-medium) 0px 0px 10px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 140px;
    display: flex;
    margin: 10px;
    border-radius: var(--border-radius-heavy);
    background-color: var(--accent-color-primary) !important;
    z-index: 2;
    transition-duration: 0s;
    position: fixed;
    bottom: 0px;
  }

  nav > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }

  .navElement,
  nav i,
  .spacer {
    font-size: 1.5rem;
    color: var(--font-link-color) !important;
  }

  @media only screen and (max-width: 1390px) {
    nav {
      gap: 75px;
    }
    nav > #center {
      display: none;
    }
  }

  @media only screen and (max-width: 480px) {
    nav > #center {
      display: none;
    }
  }
</style>
