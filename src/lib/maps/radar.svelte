<script language="JavaScript">
  import { getUrl } from "$lib/mapData";
  import { overlayItaly } from "$lib/mapData";
  import { refreshrate } from "$lib";
  import { minutes } from "$lib/mapData";
  import { offset } from "$lib/mapData";
  import { minuti } from "$lib/mapData";

  let imageSource;
  let i = 0;
  let time;
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
      let cut = time.substring(2, 4);
      formattedTime = parseInt(hours) + 1 + ":" + cut;

      generateQuery("radarsatellite-europe", "italy");
      i = i + 1;
    }, refreshrate);
  }

  generateQuery("radarsatellite-europe", "italy");

  let isOpen = "";

  function toggleSummary() {
    if (isOpen == true) {
      isOpen = "";
    } else {
      isOpen = true;
    }
  }
</script>

<details class="container">
  <summary
    on:click={toggleSummary}
    style="font-size: 25px;"
    class:open={isOpen}
  >
    Radar {isOpen && ` - ${formattedTime}`}
  </summary>
  <div class="map outline">
    <img src={overlayItaly} id="overlay" alt="overlay" class="mapSize" />
    <img src={imageSource} id="source" alt="map" />
  </div>
</details>
