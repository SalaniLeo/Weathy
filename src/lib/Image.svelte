<script>
  import { onMount } from "svelte";
  import { isPreviousMapLoaded } from "$lib";
  export let src;

  let loaded = false;
  let failed = false;
  let loading = false;

  onMount(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      loading = true;
      isPreviousMapLoaded.set(loaded);

      img.onload = () => {
        loading = false;
        loaded = true;
        console.log(loaded + "aaaa");
        isPreviousMapLoaded.set(loaded);
      };
      img.onerror = () => {
        loading = false;
        failed = true;
      };
    } else {
      loading = false;
      failed = true;
    }
  });
</script>

{#if loaded}
  <img {src} id="source" alt="map" />
{:else if failed}
  <div
    style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 800px;
    transform: translateY(-120px);"
  >
    <h1>Something went wrong :(</h1>
    <p>{src}</p>
  </div>
{:else if loading}
  <div
    style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 800px;
    transform: translateY(-120px);"
  >
    <h1>Loading...</h1>
    <p>{src}</p>
  </div>
{:else}
  <!-- <img {src} id="source" alt="map" /> -->
{/if}
