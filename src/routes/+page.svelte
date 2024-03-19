<script>
  import Weather from "./weather.svelte";
  import Forecast from "./forecast.svelte";
  import Maps from "$lib/maps/maps.svelte";
</script>

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
