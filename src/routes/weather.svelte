<script>
  // @ts-nocheck

  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import {
    mapWeatherIconToName,
    tmp_units,
    prss_units,
    location,
    speed_units,
  } from "../lib/index";
  import "../app.css";

  onMount(async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a`
    )
      .then((response) => response.json())
      .then((data) => {
        Location = data["name"];
        Temperature = data["main"]["temp"];
        feels_like = data["main"]["feels_like"];
        cloudValue = data["weather"][0]["description"];
        maxtemp = data["main"]["temp_max"];
        mintemp = data["main"]["temp_min"];
        wspeed = String(Math.round(data["wind"]["speed"] * 10) / 10);
        wind = data["wind"]["speed"];
        windDir = data["wind"]["deg"];
        sunrise = String(convertTime(data["sys"]["sunrise"]));
        sunset = String(convertTime(data["sys"]["sunset"]));
        let code = data["weather"][0]["icon"];
        pressure = data["main"]["pressure"];
        humidity = data["main"]["humidity"];
        icon = mapWeatherIconToName(code);
      });
  });

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
    hours = hours ? hours : 12;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes} ${ampm}`;
  }
</script>

<div id="root">
  <div id="weather" class="container">
    <img id="conditionsIcon" src={base + "/icons/" + icon} alt="icon" />
    <div id="info">
      <h2 id="location">{Location}</h2>
      <h4 id="temperature">{parseFloat(Temperature).toFixed(1)}{tmp_units}</h4>
      <p id="minmax">
        {parseInt(mintemp)}<i class="fa-solid fa-arrow-down" />, {parseInt(
          maxtemp
        )}<i class="fa-solid fa-arrow-up" />
      </p>
      <p id="feels_like">Feels Like {parseInt(feels_like)}{tmp_units}</p>
    </div>
  </div>

  <div id="now" class="container">
    <details>
      <summary style="font-size: 25px;" class="hover">Info</summary>
      <p id="wind_speed">Wind speed: {wind} {speed_units}</p>
      <p id="wind_directions">
        Wind direction: {toTextualDescription(windDir)}
      </p>
      <p id="pressure">Pressure: {pressure} {prss_units}</p>
      <p id="humidity">Humidity: {humidity}%</p>
      <p id="sunrise">Sunrise: {sunrise}</p>
      <p id="sunrise">Sunset: {sunset}</p>
    </details>
  </div>
</div>

<style>
  #weather {
    display: flex;
  }
  #location {
    text-wrap: pretty;
  }
</style>
