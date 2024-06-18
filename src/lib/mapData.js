let base = "https://imn-api.meteoplaza.com/v4/nowcast/tiles/";
let overlayItaly = "https://maptiler.infoplaza.io/api/maps/Border/static/11.69,41.27,5/1176x882.png?attribution=false";
let overlayEurope = "https://maptiler.infoplaza.io/api/maps/Border/static/8.24,49.41,4.2/1560x1560.png?attribution=false";
let mese = new Date().getUTCMonth() + 1;
let giorno = new Date().getUTCDate();
let ieri = giorno - 1
let anno = new Date().getFullYear();
var offset = new Date().getTimezoneOffset() / 60;
var minuti = new Date().getMinutes()
export const hours = 4

const minutes = ["15", "30", "45", "00"];

const now = new Date();
const currentMinute = now.getMinutes();

let time = currentMinute - 15;

let tmp = 4 * minutes.length;

if (time > parseInt(minutes[0]) && time <= parseInt(minutes[1])) {
    tmp = tmp;
} else if (time > parseInt(minutes[1]) && time <= parseInt(minutes[2])) {
    tmp = tmp + 1;
} else if (time > parseInt(minutes[2]) && time <= parseInt(minutes[3])) {
    tmp = tmp + 2;
} else if (time < 0) {
    tmp = tmp - 2;
}

export let stepNum = tmp

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
    console.log(time.substring(0, 2), giorno, ieri)
    if (parseInt(time.substring(0, 2)) >= 20 && parseInt(time.substring(0, 2)) < 24) {
        // if (giorno - 1 == ieri) {
        //     giorno = giorno - 1
        // }
    } else if (parseInt(time.substring(0, 2)) >= 24) {
        if (giorno = ieri ){
            giorno = giorno + 1
        }
        time = `0${(time.substring(0, 2)-24)*-1}${time.substring(2)}`
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