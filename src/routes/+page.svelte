<script>
  import Map from "./map.svelte";
  import Weather from "./weather.svelte";
  import "../app.css";
</script>

<head>
  <title>salaniLeo's Weather</title>
</head>

<root>
  <h1 id="title">SalaniLeo's Weather</h1>
  <div id="page">
    <!-- <div id="map"><Map /></div> -->
    <div id="weather"><Weather /></div>
    <div id="forecast" />
  </div>
</root>

<style>
  #title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  #page {
    position: relative;
    top: 50px;
    padding: 25px;
  }
  #weather {
    position: relative;
    /* margin-top: ; */
  }
  #map {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    height: auto;
    border-radius: 50px;
  }
</style>
