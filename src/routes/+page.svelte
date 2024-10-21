<script lang="ts">
	import { currentTheme } from '$lib/theme';
	import { degreesUnit, getDayName, getHour, getImageUrls, speedUnit } from '$lib/weather.js';
	import { mapWeatherIconToName, toTextualDescription } from '$lib/weather.js';
    import { base } from "$app/paths";
	import { onMount } from 'svelte';
    import { localDates } from '$lib/weather.js';

    export let data;

    let urls = getImageUrls(3)
    urls.splice(-1)
    urls.splice(-1)

    let carouselShow = [false, true]
    let imageWitdth: number;
    let index = 0
    let url = urls[index]

    let images = [];
    let allImagesLoaded = false;

    let total = urls.length
    let loaded = 0

    function calcPercentage(num: number) {
        return Math.round((num / total) * 100)
    }

    function preloadImages(urls: any[]) {
        return Promise.all(
            urls.map((url: string) =>
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

        const themes = {
            'light': '#ffffff',
            'dark': '#000000'
        }

        currentTheme.subscribe((theme) => {
            const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
            //@ts-ignore
            themeColorMetaTag.setAttribute('content', themes[theme]);
        })

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

<div class="root fvertical gap2 fexpand">
    <div class="first fhorizontal gap2" id="weatherMain">
        <div class="first fhorizontal gap2">
            <div class="first">
                <div class="onbackground card fvertical" id="mainWidget">
                    <div class="first">
                        <img id="now_icon" src={base + "/icons/" + mapWeatherIconToName(data.weatherData.current.weather[0].icon)} alt="icon"/>
                    </div>
                    <div class="second fhorizontal">
                        <h1>{Math.round(data.weatherData.current['temp'])} {degreesUnit}</h1>
                        <h3>Feels like {Math.round(data.weatherData.current['feels_like'])} {degreesUnit}</h3>
                        <div class="smalldata fhorizontal">
                            <p>Wind: {data.weatherData.current['wind_speed']}{speedUnit} {toTextualDescription(data.weatherData.current['wind_deg'])}</p>
                            <small>Humidity: {data.weatherData.current['humidity']}%</small>
                            <small>Pressure: {data.weatherData.current['pressure']}hPa</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="second fhorizontal gap2">
            <div id="buttons">
                <button class="btnLeft" class:active={carouselShow[1]} on:click={() => {carouselShow[0] = false; carouselShow[1] = true}}>Hourly</button>
                <button class="btnRight" class:active={carouselShow[0]} on:click={() => {carouselShow[0] = true; carouselShow[1] = false}}>Daily</button>
            </div>
            <div id="carousel">
                <div class:hide={carouselShow[1]} class="first card fhorizontal forecastCard" id="daily">
                    {#each data.weatherData.daily as daily}
                            <div class="day fvertical gap1 fexpand">
                                <div class="fvertical dayheader">
                                    <img class="forecast_icon" src={base + "/icons/" + mapWeatherIconToName(daily['weather']['0']['icon'])} alt="icon"/>
                                    <p class="dayName vcenter">{getDayName(daily.dt)}</p>
                                </div>
                                <div class="fvertical gap1 vcenter dayPrecip">
                                    <i class="fa-solid fa-droplet"></i><p>{Math.round((daily.pop)*100)}%</p>
                                </div>
                                <div class="fhorizontal">
                                    <div class="gap1 fvertical"><i class="fa-solid fa-chevron-up"></i>{Math.round(daily.temp.max)} {degreesUnit}</div>
                                    <div class="gap1 fvertical"><i class="fa-solid fa-chevron-down"></i>{Math.round(daily.temp.min)} {degreesUnit}</div>
                                </div>
                            </div>
                    {/each}
                </div>
                <div class:hide={carouselShow[0]} class="second fhorizontal gap1 card forecastCard" id="hourly">
                    {#each data.weatherData.hourly.slice(0, 8) as hourly}
                        <div class="fvertical fexpand fill vcenter">
                            <img class="forecast_icon" src={base + "/icons/" + mapWeatherIconToName(hourly['weather']['0']['icon'])} alt="icon"/>
                            <p class="hourName">{getHour(hourly.dt)}</p>
                            <div class="fvertical gap1"><i class="fa-solid fa-droplet"></i><p>{Math.round((hourly.pop)*100)}%</p></div>
                            <div class="gap1 fvertical" style="width: 50px;">{Math.round(hourly.temp)} {degreesUnit}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div class="second" id="satelliteMain">
        <div id="satelliteContainer" class:transparent={!allImagesLoaded} class="card" bind:clientWidth={imageWitdth}>
            {#if allImagesLoaded}
                <img class="satelliteImage" src={url} alt={url} />
                <div class="timebar card blurred" style="display: flex; align-items: center; width: {imageWitdth-65}px !important; transition-duration: 0s">
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
    .hourName {
        width: 50px;
    }
    .btnLeft {
        border-radius: unset;
        width: 4.5rem;
        border-top-left-radius: var(--border-radius-normal);
        border-bottom-left-radius: var(--border-radius-normal);
    }
    .btnRight {
        width: 4.5rem;
        border-radius: unset;
        border-top-right-radius: var(--border-radius-normal);
        border-bottom-right-radius: var(--border-radius-normal);
    }
    .day {
        align-items: center;
    }
    .dayName {
        width: unset;
        min-width: 110px;
    }
    .dayPrecip {
        width: 60px;
    }
    #buttons {
        gap: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .active {
        background-color: var(--hover-background-color);
    }
    .hide {
        display: none;
        transition-duration: 1s;
    }
    #carousel > div {
        position: relative;
    }
    #carousel {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #satelliteContainer {
        padding-bottom: 0.6rem;
    }
    .satelliteImage {
        border-radius: var(--border-radius-normal);
        max-width: 48rem;
        width: 100%;
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
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-light);
        gap: 1rem;
    }
    .timebar * {
        color: white !important;
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
        #mainWidget, .forecastCard {
            background-color: transparent;
            outline: none;
        }
        button {
            background-color: transparent;
        }
        .dayName {
            width: unset;
            min-width: 90px;
            font-size: 0.9rem;
        }
        #satelliteMain {
            margin-bottom: 80px;
        }
        .imagePlaceholder {
            max-width: 48rem;
            width: 100% !important;
            height: 350px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .imagePlaceholder h3{
            width: 100%;
        }
        .transparent {
            background-color: transparent;
            outline: none;
        }
    }

    @media only screen and (max-width: 480px) {
        .dayheader {
            flex-wrap: nowrap;
            gap: 0.5rem;
        }
    }

</style>