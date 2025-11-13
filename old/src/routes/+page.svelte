<script lang="ts">
	import HourlyDaily from './../lib/components/home/hourlyDaily.svelte';
	import { currentTheme } from '$lib/theme';
	import { degreesUnit, getDayName, getHour, getImageUrls, speedUnit } from '$lib/weather.js';
	import { mapWeatherIconToName, toTextualDescription } from '$lib/weather.js';
    import { base } from "$app/paths";
	import { onMount } from 'svelte';
    import { localDates } from '$lib/weather.js';
	import CurrentCard from '$lib/components/home/currentCard.svelte';

    let { data } = $props()

    let urls = getImageUrls(3)
    urls.splice(-1)
    urls.splice(-1)

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

    $effect(() => {

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

<div class="flexrow space-between gap4 padding4">
    <div class="flexcolumn gap5">
        <CurrentCard weather={data.weatherData}></CurrentCard>
        <HourlyDaily weather={data.weatherData}></HourlyDaily>
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
    #satelliteContainer {
        padding-bottom: 0.6rem;
    }
    .satelliteImage {
        border-radius: var(--border-radius-heavy);
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
        background: var(--secondary-color);
        cursor: pointer;
        border: none;
    }
    .timebar > button {
        width: 35px;
    }

    @media only screen and (max-width: 825px) {
        button {
            background-color: transparent;
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

</style>