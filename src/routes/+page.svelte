<script>
  import Weather from "./weather.svelte";
  import "../app.css";
  import Forecast from "./forecast.svelte";
  import Maps from "$lib/maps/maps.svelte";
</script>

<head>
  <title>salaniLeo's Weather</title>
</head>

<root>
  <div id="page">
    <div id="meteo" class="a">
      <div id="weather"><Weather /></div>
      <div id="forecast"><Forecast /></div>
    </div>
    <div id="satellite" class="a">
      <div id="maps"><Maps /></div>
    </div>
  </div>
</root>
