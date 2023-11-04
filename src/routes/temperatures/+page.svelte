<script>
  import { base } from "$app/paths";

  let data = new Date();
  let mese = data.getUTCMonth() + 1;
  let giorno = data.getUTCDate();
  let anno = data.getFullYear();

  if (giorno < 10) {
    giorno = "0" + giorno;
  }

  let date = anno + "" + mese + "" + giorno;
  console.log(date);

  let maxTempSource = `https://www.weatheronline.co.uk/images/charts/en/contour/${date}/euro/euro/1699127127/vtn.gif`;
  let minTempSource = `https://www.weatheronline.co.uk/images/charts/en/contour/${date}/euro/euro/1699127127/vtx.gif`;
</script>

<div id="root">
  <div class="row" style="margin-bottom: 50px;">
    <div>
      <h1>Temperatures history - Europe - Last month</h1>
    </div>

    <div id="innerRow">
      <div class="rect border">
        <p>Avarage temperature</p>
        <a
          href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1cavg1.png','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            height="165px"
            src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1cavg1.png"
            alt="ingrandisci"
          />
        </a>
      </div>

      <div class="rect border">
        <p>Temperature anomaly</p>
        <a
          href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1ctan1.png','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            height="165px"
            src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/1ctan1.png"
            alt="ingrandisci"
          />
        </a>
      </div>
    </div>
  </div>

  <div class="row" style="margin-bottom: 50px;">
    <div>
      <h1>Temperatures history - Europe - Last week</h1>
    </div>

    <div id="innerRow">
      <div class="rect border">
        <p>Maximum temperature</p>
        <a
          href="javascript:window.open('{minTempSource}','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            height="165px"
            src={minTempSource}
            alt="ingrandisci"
          />
          <img
            style="
          transform: translateY(-20px);"
            width="200px"
            src="https://www.weatheronline.co.uk/daten/gifs/rgb_temp_cross.gif"
            alt="ingrandisci"
          />
        </a>
      </div>

      <div class="rect border">
        <p>Minimum temperature</p>
        <a
          href="javascript:window.open('{maxTempSource}','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            height="165px"
            src={maxTempSource}
            alt="ingrandisci"
          />
          <img
            style="
            transform: translateY(-20px);"
            width="200px"
            src="https://www.weatheronline.co.uk/daten/gifs/rgb_temp_cross.gif"
            alt="ingrandisci"
          />
        </a>
      </div>
      <div class="rect border">
        <p>Temperature anomaly</p>
        <a
          href="javascript:window.open('https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wctan1.png','','scrollbars=no,width=1265,height=955');void('');"
        >
          <img
            class="coverImg"
            height="165px"
            src="https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/regional_monitoring/wctan1.png"
            alt="ingrandisci"
          />
        </a>
      </div>
    </div>
  </div>
</div>
