// @ts-nocheck
import Cookies from 'js-cookie'
import { writable } from 'svelte/store';
export const currentTheme = writable("light");

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

function fetchApi() {
	return new Promise((resolve) => {
		resolve(fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a`)
        .then((response)=>response.json())
        .then((responseJson)=>{

		let response = responseJson
		
		let minTemp = response.list[0]['main']['temp'];
		let maxTemp = response.list[0]['main']['temp'];
		let days = [];
		let counter = 0;

		for (var i in response.list) {
			let time = response.list[i]['dt_txt'].slice(11, 13);
			let temperature = Math.round(response.list[i]['main']['temp'] * 10) / 10;
			console.log(response.list[i]['dt'], getWeekDays(response.list[i]['dt']), time)
			if (minTemp > temperature) {
				minTemp = temperature;
			}
			if (maxTemp < temperature) {
				maxTemp = temperature;
			}

			if (time == 21) {
				let date = response.list[counter]['dt'];
				console.log(counter)

				if (counter - 3 <= 0 ) {
					days.push({ name: `${getWeekDays(date)}`, icon: `${mapWeatherIconToName(response.list[0]['weather'][0]['icon'])}`, minTemp: `${minTemp}`, maxTemp: `${maxTemp}` });
				} else {
					days.push({ name: `${getWeekDays(date)}`, icon: `${mapWeatherIconToName(response.list[counter - 3]['weather'][0]['icon'])}`, minTemp: `${minTemp}`, maxTemp: `${maxTemp}` });
				}

				minTemp = temperature;
				maxTemp = temperature;
			}
			counter = counter + 1;
		}
		console.log(days)
		return days;
	}));
});
}


  let weather = fetchApi();

  function getWeekDays(unix_timestamp)
  {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var d = new Date(unix_timestamp * 1000);
	var dayName = days[d.getDay()];

	return dayName
  }

  function mapWeatherIconToName(icon) {
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
export { weather, mapWeatherIconToName, setRefreshRate, setLocation, setShowOverlay }
