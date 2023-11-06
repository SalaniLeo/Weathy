<script>
  import Radar from "./radar.svelte";
  import Meteosat from "./meteosat.svelte";
  import Stuff from "./various.svelte";
</script>

<title>Globe</title>

<div id="root">
  <div id="top">
    <div class="row">
      <Radar />
    </div>
    <p class="spacer1" />
    <div class="row">
      <Meteosat />
    </div>
    <p class="spacer2" />
    <div class="row">
      <Stuff />
    </div>
  </div>
  <footer>
    Everything here was taken from <a href="http://www.persicetometeo.com">
      persicetometeo</a
    >, visit them for even more informations about global weather!
  </footer>
</div>

<style>
  /* #top {
    position: relative;
    text-align: center;
  }
  .row {
    padding: 0px;
  }

  .spacer1 {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 1250px;
    border-top: solid 1px wheat;
  }

  .spacer2 {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 750px;
    border-top: solid 1px wheat;
  }

  #root {
    position: relative;
    top: -20px;
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  footer {
    text-align: center;
    border-top: solid 1px wheat;
    padding: 25px;
    height: 10px;
  } */
</style>
