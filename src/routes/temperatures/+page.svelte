<script>
  import { name } from "$lib";
  import { page } from "$app/stores";
</script>

<head>
  <title>{name + $page.url.pathname.replace("/", " - ")}</title>
</head>

<div id="root">
  <div>
    <h1>Temperatures history - Europe - Last month</h1>
  </div>

  <div class="scrollableMapRow">
    <div class="mapWidgetContainer">
      <p>Avarage temperature</p>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1cavg1.png','','scrollbars=no,width=1265,height=955');void('');"
      >
        <img
          class="mapWidget"
          src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1cavg1.png"
          alt="ingrandisci"
        />
      </a>
    </div>

    <div class="mapWidgetContainer">
      <p>Temperature anomaly</p>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1ctan1.png','','scrollbars=no,width=1265,height=955');void('');"
      >
        <img
          class="mapWidget"
          src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1ctan1.png"
          alt="ingrandisci"
        />
      </a>
    </div>
  </div>

  <div>
    <div>
      <h1>Temperatures history - Europe - Last week</h1>
    </div>

    <div class="scrollableMapRow">
      <div class="mapWidgetContainer">
        <p>Maximum temperature</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wcmax1.png','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="mapWidget"
            src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wcmax1.png"
            alt="ingrandisci"
          />
        </a>
      </div>

      <div class="mapWidgetContainer">
        <p>Minimum temperature</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wcmin1.png','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="mapWidget"
            src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wcmin1.png"
            alt="ingrandisci"
          />
        </a>
      </div>

      <div class="mapWidgetContainer">
        <p>Temperature anomaly</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wctan1.png','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="mapWidget"
            src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wctan1.png"
            alt="ingrandisci"
          />
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  #root {
    margin: 10px;
  }
</style>
