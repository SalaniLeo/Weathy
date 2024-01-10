<script language="JavaScript">
  import { getUrl } from "$lib/mapData";
  import { overlayEurope } from "$lib/mapData";
  import { refreshrate } from "$lib";
  import { minutes } from "$lib/mapData";
  import { offset } from "$lib/mapData";
  import { minuti } from "$lib/mapData";

  let imageSource;
  let time;
  let i = 0;
  let ora = new Date().getUTCHours() - new Date().getTimezoneOffset() / 60 - 4;
  let oraTMP = new Date().getUTCHours() - offset / 60;
  let formattedTime;

  function generateQuery(type, region) {
    setTimeout(() => {
      if (i >= minutes.length) {
        i = 0;
      }
      if (minutes[i] == "00") {
        ora = ora + 1;
      }
      if (oraTMP == ora + 1 && parseInt(minutes[i]) + 17 > minuti) {
        ora = oraTMP - 4;
        i = 0;
      }
      let values = getUrl(type, region, i, ora);
      imageSource = values.url;
      time = values.time;

      let hours = time.substring(0, 2);
      let cut = time.substring(2);
      formattedTime = hours + ":" + cut;

      generateQuery("satellite-europe", "europe");
      i = i + 1;
    }, refreshrate);
  }

  generateQuery("satellite-europe", "europe");
</script>

<details class="container">
  <summary style="font-size: 25px;" class="hover"
    >Satellite (Europe) - {formattedTime}</summary
  >
  <div class="map outline">
    <img src={overlayEurope} alt="overlay" id="overlay" class="mapSize" />
    <img src={imageSource} alt="mapEurope" id="mapEurope" class="map" />
  </div>
</details>
