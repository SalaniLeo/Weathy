// @ts-nocheck
import Cookies from 'js-cookie'
import { writable } from 'svelte/store';
export const currentTheme = writable("light");
export const isPreviousMapLoaded = writable(true)

export let location = (Cookies.get('location')!=undefined) ? Cookies.get('location') : "Ferrara";
export let tmp_units = "°C";
export let prss_units = "hPa";
export let footer = "" 
export let speed_units = "Km/h"
export let refreshrate = (Cookies.get('refreshrate')!=undefined) ? Cookies.get('refreshrate') : 500;
export let showOverlay = (Cookies.get('showoverlay')!=undefined) ? Cookies.get('showoverlay') : false;

export function setCookie(name, args){
	Cookies.set(name, args, { expires: 365 });
}

export function getCookie(name){
	return Cookies.get(name);
}

export function setTheme(theme, save) {
    document.documentElement.dataset.theme = theme;
    currentTheme.set(theme);
    if (save) setCookie("theme", theme);
}

export function getTheme() {
  return getCookie('theme');
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

async function fetchApi() {
	let days = []
	try {
        const { lat, lon } = await getUserLocation();

		return new Promise((resolve) => {
			resolve(fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a`)
			.then((response)=>response.json())
			.then((responseJson)=>{

			let response = responseJson.daily

			for (let n in response) {
				let day = responseJson.daily[n]
				days.push(day)
			}
			return days;
		}));
	});
	} catch (error) {
		console.error("Error getting location", error);
	}
}


  let weather = fetchApi();

  export function getWeekDays(unix_timestamp)
  {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var d = new Date(unix_timestamp * 1000);
	var dayName = days[d.getDay()];

	return dayName
  }

  export function mapWeatherIconToName(icon) {
    const iconToName = {
      "01d": "weather-clear.svg",
      "01n": "weather-clear-night.svg",
      "02d": "weather-few-clouds.svg",
      "02n": "weather-few-clouds-night.svg",
      "03d": "weather-clouds.svg",
      "03n": "weather-clouds-night.svg",
      "04d": "weather-clouds.svg",
      "04n": "weather-clouds-night.svg",
      "09d": "weather-showers.svg",
      "09n": "weather-showers-night.svg",
      "10d": "weather-showers.svg",
      "10n": "weather-showers-night.svg",
      "11d": "weather-storm.svg",
      "11n": "weather-storm-night.svg",
      "13d": "weather-snow.svg",
      "13n": "weather-snow-night.svg",
      "50d": "weather-mist.svg",
      "50n": "weather-mist.svg",
    };
    return iconToName[icon] || "weather-clear.svg";
  }

function setRefreshRate(value){
	Cookies.set('refreshrate', value)
	refreshrate = value
}

function setLocation(value){
	Cookies.set('location', value)
	location = value
	window.location.reload()
}

function setShowOverlay(value){
	Cookies.set('showOverlay', value)
	showOverlay = value
}

export const name = 'Weathy'
export { weather, setRefreshRate, setLocation, setShowOverlay }
