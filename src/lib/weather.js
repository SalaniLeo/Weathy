import { writable } from "svelte/store";

export const weather = writable()
export const weatherLocation = writable()
export const weatherToken = writable()
export const reloadWeather = writable()
export let degreesUnit = "°C"
export let speedUnit = "Km/h"
export let localDates = []

export function getDayName(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

export function getHour(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(date);
}

export function mapWeatherIconToName(icon) {
    const iconToName = {
        "01d": "clear-day.svg",
        "01n": "clear-night.svg",
        "02d": "cloudy-1-day.svg",
        "02n": "cloudy-1-night.svg",
        "03d": "cloudy-2-day.svg",
        "03n": "cloudy-2-night.svg",
        "04d": "cloudy-3-day.svg",
        "04n": "cloudy-3-night.svg",
        "09d": "rainy-1-day.svg",
        "09n": "rainy-1-night.svg",
        "10d": "rainy-2-day.svg",
        "10n": "rainy-2-night.svg",
        "11d": "thunderstorms.svg",
        "11n": "thunderstorms.svg",
        "13d": "snowy-1-day.svg",
        "13n": "snowy-1-night.svg",
        "50d": "fog-day.svg",
        "50n": "fog-night.svg",
    };
return iconToName[icon] || "weather-clear.svg";
}

export function toTextualDescription(degree) {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North W";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South W";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South E";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North E";
    }
    return "Northerly";
  }

const baseIntervals = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00']
const baseUrl = 'https://imn-api.meteoplaza.com/v4/nowcast/tiles/satellite-europe/'
const endUrl = '/7/43/65/51/72?outputtype=jpeg'

export function getImageUrls(hoursNumber) {

    const intervals = Array(hoursNumber).fill(baseIntervals).flat();

    const now = new Date();

    // const currentMinutes = now.getMinutes();
    // const start = (currentMinutes - (currentMinutes % 5)) / 5

    let minutesToAdd = 0
    let urls = []

    intervals.forEach(() => {
        urls.push(`${baseUrl}${getDate(minutesToAdd, now, hoursNumber)}${endUrl}`)
        minutesToAdd += 5
    })

    return urls
}

function pad(number) {
    return number < 10 ? '0' + number : number.toString();
}

function getDate(toAdd, now, hoursNumber) {
    let minutesChanged = false;

    let year = now.getFullYear();
    let month = pad(now.getMonth() + 1);
    let day = pad(now.getDate());

    let hours = now.getHours() - 2 - hoursNumber;
    let minutes = now.getMinutes() % 5 != 0 ? now.getMinutes() - (now.getMinutes() % 5) + toAdd : now.getMinutes() + toAdd;

    if (hours < 0) {
        day = pad(parseInt(day) - 1);
        hours += 24;
    }

    while (minutes >= 60) {
        minutesChanged = true;
        minutes -= 60;
        hours += 1;
        if (hours >= 24) {
            hours -= 24;
            day = pad(parseInt(day) + 1);
        }
    }

    let tmp = pad((hours)+2) > 24 ? pad(((hours)+2)-24) : pad((hours)+2)

    localDates.push(`${tmp}:${pad(minutes)}`)

    let date = `${year}${month}${day}${pad(hours)}${pad(minutes)}`

    return date;
}