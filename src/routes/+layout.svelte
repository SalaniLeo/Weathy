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
      <p style=" color: rgba(255,255,255,0.3)">Show maps overlay:</p>
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
      <div class="vcenter">
        <label class="switch">
          <input type="checkbox" checked />
          <span class="slider round"></span>
        </label>
        <p
          style="margin-left: 10px; transform: translateY(2px); color: rgba(255,255,255,0.3)"
        >
          Disabled
        </p>
      </div>
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
  .vcenter {
    display: flex;
    align-items: center;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--secondary-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--font-primary-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  /* input:checked + .slider {
    background-color: var(--tertiary-color);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--tertiary-color);
  } */

  /* input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  } */

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
