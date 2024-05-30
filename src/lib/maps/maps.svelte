<script>
  import SatelliteEurope from "./satelliteEurope.svelte";
  import Satellite from "./satellite.svelte";
  import Radar from "./radar.svelte";
</script>

<div class="maps">
  <div class="content">
    <Satellite />
    <Radar />
    <SatelliteEurope />
  </div>
</div>

<style>
  .maps {
    max-width: 100vw;
    height: min-content;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0.5rem;
    margin-bottom: 5rem;
  }

  :global(.map) {
    background-color: var(--secondary-color);
    overflow: hidden;
    height: 657px;
    width: 885px;
    border-radius: var(--border-radius-heavy);
    border-collapse: collapse;
    overflow: hidden;
    border: 3px solid rgba(0, 0, 0, 0);
    outline: 3px solid var(--main-color);
    outline-offset: -3px;
    transition-duration: 0s !important;
  }

  :global(#source) {
    width: 100%;
    position: relative;
    height: 129.5%;
    transform: translateY(-15%);
    width: 108.75%;
    left: -6%;
  }

  :global(#sourceEurope) {
    position: relative;
    height: 113.5%;
    width: 113%;
    left: -1.5%;
  }

  :global(#overlay) {
    border-radius: var(--border-radius-heavy);
    z-index: 1;
    position: absolute;
    overflow: scroll;
  }
  :global(.semibackground) {
    background-color: var(--semi-opaque-color);
    z-index: 2;
    margin: 10px;
    padding: 7.5px;
    font-size: 20px;
    border-radius: var(--border-radius-medium);
  }
  :global(.topMapContainer) {
    top: 0px;
    z-index: 2;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  :global(.bottomMapContainer) {
    position: relative;
    margin: 10px;
    padding: 7.5px;
    font-size: 20px;
    text-align: left;
    top: 82%;
    display: flex;
    align-items: center;
    gap: 20px;
    max-height: 25px;
  }
  :global(.timebar) {
    width: 100%;
  }
  :global(input[type="range"]) {
    width: 100%;
  }
  :global(.maptime) {
    width: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  :global(.showhide) {
    display: flex;
    justify-content: right;
  }
  :global(.showhidebtn) {
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 20px;
    height: 40px;
    width: 40px;
  }
  :global(.showhidebtn i) {
    transform: translateY(3px);
  }
  :global(.maptitle) {
    position: relative;
    text-align: left;
    width: 100px;
    text-align: center;
  }
  :global(.playpausebtn) {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 20px;
    transform: translateY(2px);
    margin: 0.25rem;
  }
</style>
