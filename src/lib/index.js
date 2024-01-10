import { onMount } from "svelte";
import Cookies from 'js-cookie'


let refreshrate = (Cookies.get('refreshrate')!=undefined) ? Cookies.get('refreshrate') : 500;
let location = (Cookies.get('location')!=undefined) ? Cookies.get('location') : "Ferrara";


function fetchApi() {
	return new Promise((resolve) => {
		resolve(fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a`)
        .then((response)=>response.json())
        .then((responseJson)=>{

		let response = responseJson

		let minTemp = response.list[0]['main']['temp']
		let maxTemp = response.list[0]['main']['temp']
		let days = [];
		let counter = 0;

		for(var i in response.list){
			let time = response.list[i]['dt_txt'].slice(11, 13)
			let temperature = Math.round(response.list[i]['main']['temp']*10) / 10
			let icon = "";

			if(minTemp > temperature){
				minTemp = temperature
			} else if (maxTemp < temperature) {
				maxTemp
			}

			if(time == 0){
				let date = response.list[counter]['dt'];

				if(counter-3 < 0){
					days.push({ name: `${getWeekDays(date)}`, icon: `${mapWeatherIconToName(response.list[0]['weather'][0]['icon'])}`, minTemp: `${minTemp}`, maxTemp: `${maxTemp}`})
				} else {
				days.push({ name: `${getWeekDays(date)}`, icon: `${mapWeatherIconToName(response.list[counter-3]['weather'][0]['icon'])}`, minTemp: `${minTemp}`, maxTemp: `${maxTemp}`})
				}

				minTemp = temperature
				maxTemp = temperature
			}
			counter = counter + 1
		}
		return days
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

let tmp_units = "°C";
let prss_units = "hPa";
let footer = "Everything here was inspired by <a href='http://www.persicetometeo.com'>persicetometeo</a>, visit them for even more informations about global weather!" 

function setRefreshRate(value){
	Cookies.set('refreshrate', value)
	refreshrate = value
}

function setLocation(value){
	Cookies.set('location', value)
	location = value
	window.location.reload()
}

function setCookie(name, args){
	Cookies.set(name, args)
}

function getCookie(name){
	return Cookies.get(name)
}

export { weather }
export { mapWeatherIconToName }
export { tmp_units }
export { prss_units }
export { footer }
export { refreshrate }
export { setRefreshRate }
export { setCookie }
export { getCookie }
export { location }
export { setLocation }