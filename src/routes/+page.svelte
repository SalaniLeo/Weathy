<script lang="ts">
	import Satellite from '$lib/components/satellite.svelte';
	import { weatherData } from '$lib/openmeteo';
	import { weatherFuncs } from '$lib/weatherData.svelte';

    interface PageData {
        coordinates: {
            lat: number;
            lon: number;
        };
    }

    let { data } = $props<{ data: PageData }>();
    let weatherDescription = weatherFuncs.getWeatherDescription(weatherData.current.weather_code, weatherData.current.is_day);

    let now = new Date();

</script>


<div class="wrapper padding2 margin-top2 flexrow-responsive gap2 space-between">
    <div class="title flexcolumn gap3">
        <div class="flexrow">
            <div class="padding2">
                <img width="150px" src={weatherDescription.icon} alt="Weather Icon" />
            </div>
            <div>
                <h1 style="font-size: 46px;">{data.placeName.address.city || data.placeName.address.village}</h1>
                <div class="flexcolumn gap3">
                    <div class="flexrow">
                        <h1>{weatherDescription.name}</h1>
                    </div>
                    <div class="flexrow gap2">
                    </div>
                </div>
            </div>
        </div>
        <div class="flexcolumn">
            <div class="flexrow gap2">
                <div class="flexcolumn vendalign gap2">
                    <p>Temperature</p>
                    <p>Wind speed</p>
                    <p>Wind gusts</p>
                    <p>Relative humidity</p>
                    <p>Pressure</p>
                    <p>Cloud cover</p>
                </div>
                <div class="flexcolumn gap2">
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                </div>
                <div class="flexcolumn gap2">
                    <p>{Math.round(weatherData.current.apparent_temperature * 100) / 100} °C</p>
                    <p>{Math.round(weatherData.current.wind_speed_10m * 100) / 100} Km/h {weatherFuncs.degreesToDirection(weatherData.current.wind_direction_10m)}</p>
                    <p>{Math.round(weatherData.current.wind_gusts_10m * 100) / 100} Km/h</p>
                    <p>{weatherData.current.relative_humidity_2m} %</p>
                    <p>{Math.round(weatherData.current.pressure_msl * 100) / 100} hPa</p>
                    <p>{weatherData.current.cloud_cover} %</p>
                </div>
            </div>
        </div>
        <Satellite></Satellite>
    </div>
    <div class="flexcolumn gap3">
        {#await weatherFuncs.getWeatherAlerts()}
            Checking for alerts...
        {:then alerts}
            {#each alerts.warnings as alert}
                {#each alert.alert.info as alertInfo}
                    {#if alertInfo.expires > now.toISOString() && alertInfo.language == 'en-GB' && !alertInfo.event.includes("Green")}
                        {#each alertInfo.area as area}
                            {#if area.areaDesc === "Emilia e Romagna"}
                                <div class:moderate={true} class="alert-card radius-heavy padding3 margin-bottom2 flexcolumn gap2 border">
                                    <div class="flexrow space-between">
                                        <h2>{alertInfo.event}</h2>
                                        <p>Severity: {alertInfo.severity}</p>
                                    </div>

                                    <p>{alertInfo.description}</p>
                                </div> 
                            {/if}
                        {/each}
                    {/if}
                {/each}
            {/each}
        {/await}
    </div>
</div>

<style>
    .alert-card {
        max-width: 350px;
    }
    .moderate {
        background-color: var(--font-warning-color);
        border: 2px solid var(--font-warning-color) !important;
    }
</style>