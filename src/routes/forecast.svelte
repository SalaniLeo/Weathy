<script>
  import { weather, tmp_units } from "../lib/index";
  import { base } from "$app/paths";
</script>

<div id="root">
  <div id="forecast" class="container">
    <h2 style="line-height: 0px;">Forecast</h2>
    {#await weather}
      Loading...
    {:then content}
      {#each content as { name, icon, maxTemp, minTemp }, i}
        <div class="day">
          <p class="name">{name}</p>
          <img alt="icon" src={base + "/icons/" + icon} />
          <p class="max">{maxTemp}{tmp_units}</p>
          <p class="min">{minTemp}{tmp_units}</p>
        </div>
      {/each}
    {/await}
  </div>
</div>
