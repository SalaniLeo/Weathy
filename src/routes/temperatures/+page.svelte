<script>
  // let data = new Date();
  // let mese = data.getUTCMonth() + 1;
  // let giorno = data.getUTCDate();
  // let anno = data.getFullYear();

  // if (giorno < 10) {
  //   // @ts-ignore
  //   giorno = "0" + giorno;
  // }

  // let date = anno + "" + mese + "" + giorno;

  // let maxTempSource = `https://www.weatheronline.co.uk/images/charts/en/contour/${date}/euro/euro/1699127127/vtn.gif`;
  // let minTempSource = `https://www.weatheronline.co.uk/images/charts/en/contour/${date}/euro/euro/1699127127/vtx.gif`;
</script>

<title>SalaniLeo's Weather - Temperatures</title>

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

    <div>
      <!-- <div class="mapWidgetContainer" style="width: 200px;">
      <p>Maximum temperature</p>
      <a
        href="javascript:window.open('{minTempSource}','','scrollbars=no,width=1265,height=955');void('');"
      >
        <img class="mapWidget" src={minTempSource} alt="ingrandisci" />
        <img
          width="100%"
          src="https://www.weatheronline.co.uk/daten/gifs/rgb_temp_cross.gif"
          alt="ingrandisci"
        />
      </a>
    </div> -->

      <!-- <div class="mapWidgetContainer" style="width: 200px;">
      <p>Minimum temperature</p>
      <a
        href="javascript:window.open('{maxTempSource}','','scrollbars=no,width=1265,height=955');void('');"
      >
        <img class="mapWidget" src={maxTempSource} alt="ingrandisci" />
        <img
          width="100%"
          src="https://www.weatheronline.co.uk/daten/gifs/rgb_temp_cross.gif"
          alt="ingrandisci"
        />
      </a>
    </div> -->

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
