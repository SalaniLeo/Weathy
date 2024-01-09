<script language="JavaScript">
  let data = new Date();
  let base =
    "https://imn-api.meteoplaza.com/v4/nowcast/tiles/satellite-europe/";
  let src = "";
  let mese = data.getUTCMonth() + 1;
  let giorno = data.getUTCDate();
  let anno = data.getFullYear();

  if (mese < 10) {
    mese = "0" + mese;
  }

  if (giorno < 10) {
    giorno = "0" + giorno;
  }

  call();

  let i = 0;
  function getUrl() {
    if (i >= minutes.length) {
      i = 0;
    }

    let url =
      base +
      anno +
      mese +
      giorno +
      getTime(i) +
      "/7/43/63/52/73?outputtype=jpeg";
    i = i + 1;
    return url;
  }

  function call() {
    setTimeout(() => {
      src = getUrl();
      call();
    }, 100);
  }

  let minutes = [
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "00",
  ];

  var offset = new Date().getTimezoneOffset();
  let oraTMP = data.getUTCHours() - offset / 60;
  let minuti = data.getUTCMinutes();
  let ora = oraTMP - 4;

  function getTime(interval) {
    if (minutes[i] == "00") {
      ora = ora + 1;
      console.log("a");
    }

    let time = format(ora) + "" + minutes[i];

    if (oraTMP == ora + 1 && parseInt(minutes[i]) + 17 > minuti) {
      ora = oraTMP - 3;
      i = 0;
    }
    return time;
  }

  function format(num) {
    return num < 10 ? "0" + num.toString() : num.toString();
  }

  let overlay =
    "https://maptiler.infoplaza.io/api/maps/Border/static/11.69,41.27,5/1176x882.png?attribution=false";
</script>

<div class="map">
  <img src={overlay} id="overlay" alt="overlay" class="mapcontent" />
  <img {src} id="source" alt="map" class="mapcontent" />
</div>
