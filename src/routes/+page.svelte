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

    <div class="container">
      <h2>Satellite</h2>
      <Map />
    </div>
  </div>
</root>

<style>
root{
  border-top: 2px solid wheat;
}
</style>
