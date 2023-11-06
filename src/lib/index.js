import { onMount } from "svelte";

function fetchApi() {
	return new Promise((resolve) => {
		resolve(fetch('http://api.openweathermap.org/data/2.5/forecast?lat=44.8268&lon=11.6207&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a')
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson}));
		console.log("Called")
	});
  }

  async function getForecast() {
	const result = await fetchApi();

	let minTemp = result.list[0]['main']['temp']
	let maxTemp = result.list[0]['main']['temp']
	let days = [];
	let counter = 0;

	for(var i in result.list){
		let time = result.list[i]['dt_txt'].slice(11, 13)
		let temperature = Math.round(result.list[i]['main']['temp']*10) / 10
		let icon = "";

		if(minTemp > temperature){
			minTemp = temperature
		} else if (maxTemp < temperature) {
			maxTemp
		}

		if(time == 0){
			let date = result.list[counter]['dt'];

			if(counter-3 < 0){
				days.push({ name: `${getWeekDays(date)}`, icon: `${mapWeatherIconToName(result.list[0]['weather'][0]['icon'])}`, minTemp: `${minTemp}`, maxTemp: `${maxTemp}`})
			} else {
			days.push({ name: `${getWeekDays(date)}`, icon: `${mapWeatherIconToName(result.list[counter-3]['weather'][0]['icon'])}`, minTemp: `${minTemp}`, maxTemp: `${maxTemp}`})
			}
			console.log(counter-3)

			minTemp = temperature
			maxTemp = temperature
		}
		counter = counter + 1
	}
	return days
  }
  
  let weather = getForecast();

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
	console.log(icon)
    return iconToName[icon] || "weather-clear.svg";
  }

let tmp_units = "°C";
let prss_units = "hPa";

export { weather }
export { mapWeatherIconToName }
export { tmp_units }
export { prss_units }
