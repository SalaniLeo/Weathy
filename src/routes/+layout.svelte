<script>
  // @ts-nocheck
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { onMount } from "svelte";
  import Modal from "../lib/Modal.svelte";
  import Navbar from "$lib/navbar.svelte";
  import {
    refreshrate,
    setLocation,
    setRefreshRate,
    location,
    currentTheme,
    setTheme,
    getCookie,
  } from "$lib";

  let showModal = false;
  let refreshratetmp = refreshrate;
  let locationtmp = location;

  onMount(() => {
    const themeFromCookie = getCookie("theme");
    if (themeFromCookie != null) {
      currentTheme.set(themeFromCookie);
      setTheme(themeFromCookie, false);
    } else {
      setTheme(currentTheme, true);
    }
  });
</script>

<h1 class="title">Weathy</h1>
<button
  id="optionsButton"
  style="padding: 7px; !important"
  on:click={() => (showModal = true)}
>
  <i class="fa-solid fa-gear"></i>
</button>

<!-- Modal Component -->
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
  <div id="optionsRoot">
    <div class="optionsContent">
      <p>Map refresh rate (ms):</p>
      <p>Location:</p>
    </div>
    <div class="optionsContent">
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

<slot />
<root>
  <Navbar></Navbar>
</root>

<style>
  root {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  #optionsButton {
    position: fixed;
    top: 0px;
    right: 0px;
    margin: 20px;
    height: 40px;
    width: 40px;
    z-index: 2;
  }
  .textInput {
    border-radius: var(--border-radius-medium);
    background-color: var(--secondary-color);
    outline: none;
    border: none;
    padding: 10px;
    width: fit-content;
    transition-duration: 0.25s;
  }
  .textInput:focus {
    background-color: var(--accent-color-secondary);
  }
</style>
