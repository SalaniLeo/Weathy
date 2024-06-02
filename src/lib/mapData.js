let base = "https://imn-api.meteoplaza.com/v4/nowcast/tiles/";
let overlayItaly = "https://maptiler.infoplaza.io/api/maps/Border/static/11.69,41.27,5/1176x882.png?attribution=false";
let overlayEurope = "https://maptiler.infoplaza.io/api/maps/Border/static/8.24,49.41,4.2/1560x1560.png?attribution=false";
let minutes = [
    "15", "30", "45", "00",
];
let mese = new Date().getUTCMonth() + 1;
let giorno = new Date().getUTCDate();
let anno = new Date().getFullYear();
var offset = new Date().getTimezoneOffset() / 60;
var minuti = new Date().getMinutes()
export const hours = 4
export let stepNum = 4 * minutes.length

const now = new Date();
const currentMinute = now.getMinutes();

if        (currentMinute-15>parseInt(minutes[0]) && currentMinute-15<parseInt(minutes[1])) {
    stepNum = stepNum;
} else if (currentMinute-15>parseInt(minutes[1]) && currentMinute-15<parseInt(minutes[2])) {
    stepNum = stepNum-1;
} else if (currentMinute-15>parseInt(minutes[2]) && currentMinute-15<parseInt(minutes[3])) {
    stepNum = stepNum-2;
} else if (currentMinute-15>parseInt(minutes[3]) && currentMinute-15<parseInt(minutes[0])) {
    stepNum = stepNum-3;
}

if (mese < 10) {
    // @ts-ignore
    mese = "0" + mese;
}

if (giorno < 10) {
    // @ts-ignore
    giorno = `0${giorno}`;
}

if (offset<0) {
    offset = 0+offset*-1
}

// @ts-ignore
function getUrl(mapStyle, region, i, ora) {
  let time = ora + "" + minutes[i]
    if(mapStyle == "radarsatellite-europe"){
      time = ora + "" + minutes[i] + "00";
    }

    let zone = "";
    if (region == "italy") {
        zone = "/7/43/63/52/73";
    } else if (region == "europe") {
        zone = "/5/8/14/14/20";
    }

    let url =
        base +
        mapStyle +
        "/" +
        anno +
        mese +
        giorno +
        time +
        zone +
        "?outputtype=jpeg";
    i = i + 1;

    return { url, time};
}

export { getUrl };
export { overlayItaly };
export { overlayEurope };
export { minutes };
export { offset };
export { minuti }