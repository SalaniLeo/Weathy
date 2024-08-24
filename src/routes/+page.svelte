<script lang="ts">
	import { lazyLoad } from '$lib/lazyload.js';
	import { degreesUnit, getDayName, getHour, getImageUrls, speedUnit } from '$lib/weather.js';
	import { mapWeatherIconToName, toTextualDescription } from '$lib/weather.js';
    import { base } from "$app/paths";
    import { weather } from '$lib/weather.js';
	import { onMount } from 'svelte';
    import { localDates } from '$lib/weather.js';
    
    export let data;

    let urls = getImageUrls(3)
    urls.splice(-1)
    urls.splice(-1)

    let index = 0
    let url = urls[index]

    let currentData: any;
    let forecastData = data.weatherData.daily
    let hourlyData = data.weatherData.hourly
    hourlyData.splice(10, 48)

    weather.set(data.weatherData.current)
    weather.subscribe((value) => {
        currentData = value
    })

    let icon = mapWeatherIconToName(currentData.weather[0].icon)

    let temp = Math.round(currentData['temp'])
    let feelsLike = Math.round(currentData['feels_like'])

    let humidity = currentData['humidity']
    let pressure = currentData['pressure']
    let wind_speed = currentData['wind_speed']
    let wind_deg = toTextualDescription(currentData['wind_deg'])
    let images = [];
    let allImagesLoaded = false;

    let total = urls.length
    let loaded = 0

    function calcPercentage(num) {
        return Math.round((num / total) * 100)
    }

    function preloadImages(urls) {
        return Promise.all(
            urls.map((url) =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {resolve(img); loaded += 1};
                img.onerror = reject;
            })
            )
        );
    }

    onMount(() => {
        preloadImages(urls).then((loadedImages) => {
            images = loadedImages;
            allImagesLoaded = true;
            timer()
        }).catch((error) => {
            console.error('Failed to load images', error);
        });
    })

let value = "0";
let stopMaps = false

function timer() {
    if (!stopMaps && allImagesLoaded) {
        setTimeout(() => {
            if(index >= images.length) { index = 0 }
            changeUrl();
            timer()
            index += 1
            value = String(index)
        }, 500)
    }
}

function changeUrl() {
    if(index == undefined || stopMaps == true) {
        url = urls[index]
    } 
    if (index != undefined) {
        url = urls[index]
    }
}

function changeMap(event:any) {
    stopMaps = true
    index = Number(event.target.value)
    changeUrl()
}

function playOrPause() {
    stopMaps = !stopMaps
    if (!stopMaps) { timer() }
}

</script>

<div class="root fvertical">
    <div class="first fhorizontal" id="weatherMain">
        <div class="first fhorizontal gap2">
            <div class="first">
                <div class="onbackground card fvertical">
                    <div class="first">
                        <img id="now_icon" src={base + "/icons/" + icon} alt="icon"/>
                    </div>
                    <div class="second fhorizontal">
                        <h1>{temp} {degreesUnit}</h1>
                        <h3>Feels like {feelsLike} {degreesUnit}</h3>
                        <div class="smalldata fhorizontal">
                            <p>Wind: {wind_speed}{speedUnit} {wind_deg}</p>
                            <small>Humidity: {humidity}%</small>
                            <small>Pressure: {pressure}hPa</small>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="second fhorizontal gap1 card" id="hourly">
                {#each hourlyData as hourly}
                    <div class="hour fvertical">
                        <div class="first">
                            <div class="fvertical hourheader">
                                <img class="forecast_icon" src={base + "/icons/" + mapWeatherIconToName(hourly['weather']['0']['icon'])} alt="icon"/>
                                <p class="hourName">{getHour(hourly.dt)}</p>
                                <div class="gap1 fvertical">{Math.round(hourly.temp)} {degreesUnit}</div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div> -->
        </div>
        <div class="second">
            <div class="card fhorizontal" id="dailyForecast">
                {#each forecastData as daily}
                        <div class="day fvertical gap1">
                            <div class="fvertical dayheader">
                                <img class="forecast_icon" src={base + "/icons/" + mapWeatherIconToName(daily['weather']['0']['icon'])} alt="icon"/>
                                <p class="dayName">{getDayName(daily.dt)}</p>
                            </div>
                            <div class="fhorizontal">
                                <div class="gap1 fvertical"><i class="fa-solid fa-chevron-up"></i>{Math.round(daily.temp.max)} {degreesUnit}</div>
                                <div class="gap1 fvertical"><i class="fa-solid fa-chevron-down"></i>{Math.round(daily.temp.min)} {degreesUnit}</div>
                            </div>
                        </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="second" id="satelliteMain">
        <div class="card">
            {#if allImagesLoaded}
                <img class="satelliteImage" src={url} alt={'a'} />
                <div class="timebar card blurred" style="display: flex; align-items: center;">
                    {#if !stopMaps}
                        <button class="playpausebtn blurred" on:click={playOrPause}
                        ><i class="fa-solid fa-pause"></i></button
                        >
                    {:else}
                        <button class="playpausebtn blurred" on:click={playOrPause}
                        ><i class="fa-solid fa-play"></i></button
                        >
                    {/if}
                    <input
                      type="range"
                      min="0"
                      max={images.length-1}
                      bind:value
                      on:change={changeMap}
                    />
                    <b>{localDates[index]}</b>
                  </div>
            {:else}
                <div class="imagePlaceholder">
                    <h3>Loading images, {calcPercentage(loaded)}%</h3>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .root {
        justify-content: space-between;
    }
    .satelliteImage {
        border-radius: var(--border-radius-light);
        width: 48rem;
    }
    .imagePlaceholder {
        width: 48rem;
        height: 884px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .timebar {
        position: absolute;
        transform: translate(7.5px, -64px);
        padding: 0.5rem;
        width: 46rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    input {
        -webkit-appearance: none;
        width: 100%;
        background: var(--hover-background-color);
        height: 5px;
        border-radius: var(--border-radius-normal);
    }
    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 17.5px;
        height: 17.5px;
        border-radius: 50%;
        background: var(--accent-color);
        cursor: pointer;
        border: none;
    }
    input::-moz-range-thumb {
        width: 17.5px;
        height: 17.5px;
        border-radius: 50%;
        background: var(--accent-color);
        cursor: pointer;
        border: none;
    }
    .timebar > button {
        width: 35px;
    }
    @media only screen and (max-width: 825px) {
    .satelliteImage {
        border-radius: var(--border-radius-light);
        width: 100%;
    }
    .imagePlaceholder {
        width: 48rem;
        height: 884px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

@media only screen and (max-width: 480px) {
    #satelliteMain {
        margin-bottom: 80px;
    }
    .timebar {
        width: 75%;
    }
    /* #weatherMain > .first {
        width: min-content !important;
    }
    #weatherMain {
        flex-wrap: nowrap !important;
        flex-direction: row;
        gap: 1rem;
    }
    .dayheader {
        flex-wrap: nowrap;
        gap: 0;
        font-size: 0.8rem;
    }
    .dayName {
        width: unset;
    }
    #hourly {
        width: max-content;
        justify-content: space-between !important;
        display: flex;
        flex-direction: column !important;
        flex-wrap: nowrap;
    }
    .forecast_icon {
        width: 10vw;
    }
    .hourheader {
        width: 100%;
        gap: 1rem;
        width: max-content;
    } */
}

</style>