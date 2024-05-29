<script lang="ts">
  import { refreshrate, showOverlay } from "$lib";
  import {
    getUrl,
    overlayItaly,
    minutes,
    offset,
    stepNum,
  } from "$lib/mapData.js";

  let ora = new Date().getUTCHours() - 4;

  let showmap = true; // Inverse, so by default false
  let mapheight = ["657px", "60px"];

  let playpause = true;

  let value = "0";
  let sourceIndex = 0;
  let source: string;
  let sourceTime: string;
  let sources: any[] = [];
  let timeoutId: ReturnType<typeof setTimeout>;

  getUrls("satellite-europe", "europe");

  function getUrls(type: string, region: string) {
    for (let i = 0; i <= stepNum; i++) {
      if (minutes[sourceIndex] == "00") {
        ora = ora + 1;
      }
      if (sourceIndex >= minutes.length) {
        sourceIndex = sourceIndex - minutes.length;
      }

      let url = getUrl(type, region, sourceIndex, ora);

      sources.push(url);
      sourceIndex++;
    }
  }

  function changeMap(event: any) {
    try {
      sourceIndex = event.target.value;
      stopLoop();
    } catch {
      sourceIndex = event;
    }
    source = sources[sourceIndex]["url"];
    let time = sources[sourceIndex]["time"];
    let hours = time.substring(0, 2);
    let cut = time.substring(2, 4);
    sourceTime = `${parseInt(hours) + offset}:${cut}`;
  }

  function hideorshow() {
    showmap = !showmap;
    playpause = !playpause;
  }

  function playorpause() {
    playpause = !playpause;
    if (playpause) {
      setTimeout(loopFunction, refreshrate);
    } else {
      clearTimeout(timeoutId);
    }
  }

  let y = 0;
  const loopFunction = (): void => {
    if (y >= sources.length) {
      y = 0;
    }
    changeMap(y);
    y++;
    value = y.toString();
    timeoutId = setTimeout(loopFunction, refreshrate);
  };

  const startLoop = (): void => {
    setTimeout(loopFunction, refreshrate);
  };

  const stopLoop = (): void => {
    clearTimeout(timeoutId);
  };

  startLoop();
</script>

<div class="map outline" style="height: {mapheight[+showmap]};">
  <div class="topMapContainer">
    <div class="maptitle semibackground">Europe</div>
    <div class="showhide">
      {#if showmap}
        <button class="showhidebtn semibackground" on:click={hideorshow}
          ><i class="fa-solid fa-chevron-down"></i></button
        >
      {:else}
        <button class="showhidebtn semibackground" on:click={hideorshow}
          ><i class="fa-solid fa-chevron-up"></i></button
        >
      {/if}
    </div>
  </div>
  <div class="bottomMapContainer semibackground">
    <div
      class="maptime"
      style="display: flex; align-items: center; transform: translateY(2px);"
    >
      {sourceTime}
    </div>
    <div id="playpausebtns">
      {#if playpause}
        <button class="playpausebtn" on:click={playorpause}
          ><i class="fa-solid fa-pause"></i></button
        >
      {:else}
        <button class="playpausebtn" on:click={playorpause}
          ><i class="fa-solid fa-play"></i></button
        >
      {/if}
    </div>
    <div class="timebar" style="display: flex; align-items: center;">
      <input
        type="range"
        min="0"
        max={stepNum}
        bind:value
        on:change={changeMap}
      />
    </div>
  </div>
  {#if showOverlay}
    <img src={overlayItaly} id="overlay" alt="overlay" class="mapSize" />
  {/if}
  <img src={source} id="source" alt="map" />
</div>
