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
  let showmap = false;
  const mapheight = ["fit-content", "60px"];
  let playpause = true;
  let value = "0";
  let sourceIndex = 0;
  let y = sourceIndex;
  let source: string = "";
  let sourceTime: string = "";
  let sources: Array<{ url: string; time: string }> = [];
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  getUrls("satellite-europe", "europe");

  function getUrls(type: string, region: string): void {
    for (let i = 0; i <= stepNum; i++) {
      if (ora < 0) {
        ora = 24 + ora;
      }
      if (minutes[sourceIndex] === "00") {
        ora++;
      }
      if (ora < 10 && ora.toString()[0] != "0") {
        ora = `0${ora}`;
      }
      if (sourceIndex >= minutes.length) {
        sourceIndex -= minutes.length;
      }
      const url = getUrl(type, region, sourceIndex, ora);
      sources.push({ url: url["url"], time: `${ora}${minutes[sourceIndex]}` });
      sourceIndex++;
    }
  }

  function changeMap(event: any): void {
    if (showmap) {
      sourceIndex =
        typeof event === "number" ? event : parseInt(event.target.value, 10);
      try {
        event.target.value;
        playpause = false;
      } catch {
        event;
      }
      stopLoop();
      const { url, time } = sources[sourceIndex];
      source = url;
      let hours = time.substring(0, 2);
      const minutes = time.substring(2, 4);
      if (parseInt(hours) + offset >= 24) {
        hours = String(parseInt(hours) - 24);
      }
      sourceTime = `${parseInt(hours, 10) + offset}:${minutes}`;
    }
  }

  function hideOrShow(): void {
    showmap = !showmap;
    playpause = showmap;
    if (showmap) {
      startLoop();
    } else {
      stopLoop();
    }
  }

  function playOrPause(): void {
    playpause = !playpause;
    if (playpause) {
      startLoop();
    } else {
      stopLoop();
    }
  }

  const loopFunction = (): void => {
    if (showmap) {
      if (y >= sources.length) {
        y = 0;
      }
      changeMap(y);
      value = y.toString();
      y++;
      timeoutId = setTimeout(loopFunction, refreshrate);
    }
  };

  const startLoop = (): void => {
    stopLoop();
    timeoutId = setTimeout(loopFunction, refreshrate);
  };

  const stopLoop = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  startLoop();
</script>

<div class="map outline" style="height: {mapheight[+!showmap]};">
  <div class="topMapContainer">
    <div class="maptitle semibackground">Europe</div>
    <div class="showhide">
      {#if showmap}
        <button class="showhidebtn semibackground" on:click={hideOrShow}
          ><i class="fa-solid fa-chevron-up"></i></button
        >
      {:else}
        <button class="showhidebtn semibackground" on:click={hideOrShow}
          ><i class="fa-solid fa-chevron-down"></i></button
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
        <button class="playpausebtn" on:click={playOrPause}
          ><i class="fa-solid fa-pause"></i></button
        >
      {:else}
        <button class="playpausebtn" on:click={playOrPause}
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
