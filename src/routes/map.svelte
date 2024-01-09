<script language="JavaScript">
  let data = new Date();
  let base =
    "https://imn-api.meteoplaza.com/v4/nowcast/tiles/satellite-europe-infrared/";
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
      "/5/8/14/14/20?outputtype=jpeg";
    i = i + 1;
    return url;
  }

  function call() {
    setTimeout(() => {
      src = getUrl();
      call();
    }, 500);
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
  let ora = oraTMP - 3;

  function getTime(interval) {
    if (minutes[i] == "00") {
      ora = ora + 1;
    }

    let time = format(ora) + "" + minutes[i];

    if (oraTMP == ora + 1 && minutes[i] + 15 > minuti) {
      ora = oraTMP - 3;
      i = 0;
    }
    console.log(time);
    return time;
  }

  function format(num) {
    return num < 10 ? "0" + num.toString() : num.toString();
  }

  call();
</script>

<img {src} id="source" alt="map" />
