<script>
  import SatelliteEurope from "./satelliteEurope.svelte";
  import Satellite from "./satellite.svelte";
  import Radar from "./radar.svelte";
</script>

<div class="root">
  <div class="content">
    <Satellite />
    <Radar />
    <SatelliteEurope />
  </div>
</div>

<style>
  .root {
    max-width: 100vw;
    overflow: scroll !important;
    max-height: 115vh;
  }

  :global(.mapSize) {
    height: 657px;
    width: 885px;
  }

  :global(.map) {
    overflow: hidden;
    height: 657px;
    width: 885px;
    border-radius: var(--border-radius-heavy);
    border-collapse: collapse;
    overflow: hidden;
    border: 3px solid rgba(0, 0, 0, 0);
    outline: 3px solid var(--main-color);
    outline-offset: -3px;
  }

  :global(#source) {
    width: 100%;
    position: relative;
    height: 130%;
    transform: translateY(-93%);
    width: 108.75%;
    left: -6%;
  }

  :global(#sourceEurope) {
    position: relative;
    height: 114.25%;
    width: 113%;
    left: -1.5%;
  }

  :global(#overlay) {
    border-radius: var(--border-radius-heavy);
    z-index: 1;
    position: relative;
    overflow: scroll;
  }
</style>
