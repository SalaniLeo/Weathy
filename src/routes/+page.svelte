<script>
  import Map from "./map.svelte";
  import Weather from "./weather.svelte";
  import "../app.css";
</script>

<head>
  <title>salaniLeo's Weather</title>
</head>

<root>
  <div id="page">
    <div id="weather"><Weather /></div>
    <div id="forecast" />
    <div id="map">
      <h1>Satellite</h1>
      <div id="satellite">
        <Map />
      </div>
    </div>
  </div>
</root>

<style>
  #page {
    position: relative;
    top: -30px;
    padding: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  #weather {
    position: relative;
  }
  #map {
    text-align: center;
    padding: 10px;
    position: relative;
    grid-area: 1 / 2 / 2 / 3;
    height: auto;
  }
  #satellite {
    width: auto;
    border-radius: 60px;
    border-collapse: collapse;
    overflow: hidden;
    border: 30px solid rgba(0, 0, 0, 0);
    outline: 1px solid wheat;
    outline-offset: -32px;
  }
</style>
