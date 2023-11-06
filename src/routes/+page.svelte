<script>
  import Map from "./map.svelte";
  import Weather from "./weather.svelte";
  import "../app.css";
  import Forecast from "./forecast.svelte";
</script>

<head>
  <title>salaniLeo's Weather</title>
</head>

<root>
  <div id="page">
    <div>
      <div id="weather"><Weather /></div>
      <div id="forecast"><Forecast /></div>
    </div>
    <div id="map">
      <h1>Satellite</h1>
      <div id="satellite">
        <Map />
      </div>
    </div>
  </div>
</root>

<style>
  #map {
    text-align: center;
    padding: 10px;
    position: relative;
    grid-area: 1 / 2 / 2 / 3;
    height: auto;
  }
</style>
