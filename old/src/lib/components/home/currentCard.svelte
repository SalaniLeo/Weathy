<script lang="ts">
	import { base } from "$app/paths";
	import { degreesUnit, mapWeatherIconToName, speedUnit, toTextualDescription } from "$lib/weather";

    let { weather } = $props()
</script>


<div class="flexrow padding2 card radius-heavy halign">
    <img class="icon-big" src={base + "/icons/" + mapWeatherIconToName(weather.current.weather[0].icon)} alt="icon"/>
    <div class="conditions flexcolumn gap4 halign">
            <div>
                <h1>{Math.round(weather.current['temp'])} {degreesUnit}</h1>
                <h3>Feels like {Math.round(weather.current['feels_like'])} {degreesUnit}</h3>
            </div>
            <div class="flexcolumn">
                <p>Wind: {weather.current['wind_speed']}{speedUnit} {toTextualDescription(weather.current['wind_deg'])}</p>
                <small>Humidity: {weather.current['humidity']}%</small>
                <small>Pressure: {weather.current['pressure']}hPa</small>
            </div>
    </div>
</div>


<style>
    h1, h3, p {
        text-wrap: nowrap;
        margin: 0;
    }
    .card {
        background-color: var(--background-blurry);
        border: 1px solid var(--border-color);
        min-width: max-content;
    }
    .icon-big {
        width: auto;
        height: 180px;
        /* aspect-ratio: 1 !important; */
    }
</style>