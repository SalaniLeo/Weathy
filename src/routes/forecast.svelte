<script>
  import {
    weather,
    tmp_units,
    getWeekDays,
    mapWeatherIconToName,
  } from "../lib/index";
  import { base } from "$app/paths";
</script>

<div id="root">
  <div id="forecast" class="container">
    <h2 style="line-height: 0px;">Forecast</h2>
    {#await weather}
      Loading...
    {:then content}
      {#each content as { clouds, dew_point, dt, feels_like, humidity, moon_phase, moonrise, moonset, pop, pressure, rain, summary, sunrise, sunset, temp, uvi, weather, wind_deg, wind_gust, wind_speed }, i}
        <div class="day">
          <p class="name">{getWeekDays(dt)}</p>
          <img
            alt="icon"
            src={base + "/icons/" + mapWeatherIconToName(weather[0]["id"])}
          />
          <p class="max">{temp.max}{tmp_units}</p>
          <p class="min">{temp.min}{tmp_units}</p>
        </div>
      {/each}
    {/await}
  </div>
</div>
