<script>
  import Radar from "./radar.svelte";
  import Meteosat from "./meteosat.svelte";
  import Stuff from "./various.svelte";
</script>

<title>SalaniLeo's Weather - Globe</title>

<div id="root">
  <div id="top">
    <div class="row">
      <Radar />
    </div>
    <!-- <p class="spacer1" />
    <div class="row">
      <Meteosat />
    </div> -->
    <div class="row">
      <Stuff />
    </div>
  </div>
</div>

<style>
  #root {
    margin: 10px;
  }
</style>
