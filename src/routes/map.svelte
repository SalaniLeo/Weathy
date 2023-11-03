<script language="JavaScript">
  var cell = -1;
  var num = 8;

  let aImage = new Array(8);
  let aTime = new Array(8);

  let data = new Date();
  let ora = data.getUTCHours();
  let minuti = data.getUTCMinutes();
  let src = "http://sat24.com/image2.ashx?region=eu&ir=true";
  let mese = data.getUTCMonth() + 1;
  let giorno = data.getUTCDate();
  let anno = data.getFullYear();

  if (mese < 10) {
    mese = mese;
  } else {
    mese = mese;
  }

  if (minuti < 15) {
    minuti = "00";
  } else if (15 <= minuti && minuti < 30) {
    minuti = 15;
  } else if (30 <= minuti && minuti < 45) {
    minuti = 30;
  } else {
    minuti = 45;
  }

  if (minuti < 15) {
    ora = ora - 1;
  }

  if (giorno < 10) {
    giorno = "0" + giorno;
  }

  let ore = [ora - 2, ora - 1, ora];
  let minutes = [
    "00",
    "15",
    "30",
    "45",
    "00",
    "15",
    "30",
    "45",
    "00",
    "15",
    "30",
  ];

  function incrementI(i) {
    i = i + 1;
    if (i > num) {
      i = 1;
    }
    return i;
  }

  let cnt = 0;

  let i = 0;
  const incr = () => (
    (src = new String(
      "http://sat24.com/image2.ashx?region=eu&ir=true&time=" +
        anno +
        mese +
        giorno +
        getOre(i) +
        "" +
        minutes[i]
    )),
    (i = incrementI(i))
  );

  let clear;
  clear = setInterval(incr, 1000);

  function getOre(i) {
    if (minutes[i] == "00") {
      cnt = cnt + 1;
    }
    if (cnt > 2) {
      cnt = 0;
    }
    return ore[cnt];
  }
</script>

<div id="map">
  <img {src} alt="map" height="500px" />
  <!-- Thanks to http://www.persicetometeo.com/ for the base code. -->
</div>
