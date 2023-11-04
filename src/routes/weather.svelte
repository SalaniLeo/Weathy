<script>
  import { base } from "$app/paths";
  let millisecondsSinceEpoch = Date.now();

  let Location = "";
  let Temperature = "";
  let cloudValue = "";
  let maxtemp = "";
  let mintemp = "";
  let wspeed = "";
  let feels_like = "";
  let icon = "weather-clear.svg";
  let pressure = "";
  let humidity = "";

  let wind = "";
  let windDir = "";
  let sunrise = "";
  let sunset = "";

  let tmp_units = "°C";
  let prss_units = "hPa";

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=ferrara&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a"
  )
    .then((response) => response.json())
    .then((data) => {
      Location = data["name"];
      Temperature = data["main"]["temp"];
      feels_like = data["main"]["feels_like"];
      cloudValue = data["weather"][0]["description"];
      maxtemp = data["main"]["temp_max"];
      mintemp = data["main"]["temp_min"];
      wspeed = data["main"]["humidity"];
      wind = data["wind"]["speed"];
      windDir = data["wind"]["deg"];
      sunrise = String(convertTime(data["sys"]["sunrise"]));
      sunset = String(convertTime(data["sys"]["sunset"]));
      let code = data["weather"][0]["icon"];
      pressure = data["main"]["pressure"];
      humidity = data["main"]["humidity"];
      console.log(code);
      icon = mapWeatherIconToName(code);
    });

  function mapWeatherIconToName(icon) {
    const iconToName = {
      "01d": "weather-clear.svg",
      "01n": "weather-clear-night.svg",
      "02d": "weather-few-clouds.svg",
      "02n": "weather-few-clouds-night.svg",
      "03d": "weather-many-clouds.svg",
      "03n": "weather-many-clouds-night.svg",
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
  function toTextualDescription(degree) {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North Easterly";
    }
    return "Northerly";
  }

  function convertTime(milliseconds) {
    let date = new Date(milliseconds * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    console.log(base + "status");

    return `${hours}:${minutes} ${ampm}`;
  }
</script>

<div id="root">
  <div id="weather">
    <img id="icon" src={"/icons/" + icon} alt="icon" />
    <div id="info">
      <p id="location">{Location}</p>
      <p id="temperature">{parseFloat(Temperature).toFixed(1)}{tmp_units}</p>
      <p id="minmax">
        {parseInt(mintemp)}<i class="fa-solid fa-arrow-down" />, {parseInt(
          maxtemp
        )}<i class="fa-solid fa-arrow-up" />
      </p>
      <p id="feels_like">Feels Like {parseInt(feels_like)}{tmp_units}</p>
    </div>
  </div>
  <div id="now" class="top">
    <h2 class="top">Info</h2>
    <p id="wind_speed" class="top">Wind speed: {wind}</p>
    <p id="wind_directions" class="top">
      Wind direction: {toTextualDescription(windDir)}
    </p>
    <p id="pressure" class="top">Pressure: {pressure} {prss_units}</p>
    <p id="humidity" class="top">Humidity: {humidity}%</p>
    <p id="sunrise" class="top">Sunrise: {sunrise}</p>
    <p id="sunrise" class="top">Sunset: {sunset}</p>
  </div>
</div>

<style>
  #info {
    position: relative;
    top: -5px;
  }
  #location {
    font-size: 35px;
  }
  #temperature,
  #feels_like {
    position: relative;
    top: -25px;
    font-size: 25px;
  }
  #icon {
    width: 200px;
  }
  #weather {
    display: grid;
    grid-template-columns: 0fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  #minmax {
    position: relative;
    top: -45px;
  }
  #feels_like {
    top: -45px;
    font-size: 18px;
  }
  #now {
    padding: 20px;
    width: 250px;
    height: 200px;
    justify-content: center;
  }
  .top {
    position: relative;
    top: -10px;
  }
  .fa-solid {
    font-size: 12px;
  }
</style>
