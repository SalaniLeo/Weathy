<script>
  import { onMount } from "svelte";
  import { weather, tmp_units } from "../lib/index";
  import { base } from "$app/paths";
</script>

<div id="root">
  <div id="forecast">
    <h2 id="title">Forecast</h2>
    {#await weather}
      Loading...
    {:then content}
      {#each content as { name, icon, maxTemp, minTemp }, i}
        <div class="day">
          <p class="name">{name}</p>
          <img class="icon" alt="icon" src={base + "/icons/" + icon} />
          <p class="max">{maxTemp}{tmp_units}</p>
          <p class="min">{minTemp}{tmp_units}</p>
        </div>
      {/each}
    {/await}
  </div>
</div>

<style>
  .day {
    display: flex;
    gap: 20px;
  }
  .max {
    position: absolute;
    left: 200px;
  }
  .min {
    position: absolute;
    left: 260px;
  }
  .icon {
    position: absolute;
    left: 140px;
    height: 40px;
    transform: translateY(5px);
  }
</style>
