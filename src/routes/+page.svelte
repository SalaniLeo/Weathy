<script>
  import Weather from "./weather.svelte";
  import Forecast from "./forecast.svelte";
  import Maps from "$lib/maps/maps.svelte";
  import { name } from "$lib";
</script>

<head>
  <title>{name}</title>
</head>

<root>
  <div class="root">
    <div id="meteo">
      <div id="weather"><Weather /></div>
      <div id="forecast"><Forecast /></div>
    </div>
    <div id="satellite">
      <div id="maps"><Maps /></div>
    </div>
  </div>
</root>
