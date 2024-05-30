<script>
  import Radar from "./radar.svelte";
  import Meteosat from "./meteosat.svelte";
  import Stuff from "./various.svelte";
  import { name } from "$lib";
  import { page } from "$app/stores";
</script>

<head>
  <title>{name + $page.url.pathname.replace("/", " - ")}</title>
</head>

<div id="root">
  <div id="top">
    <div class="row">
      <Radar />
    </div>
    <!-- <div class="row">
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
