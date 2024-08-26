<script lang="ts">
	import { reloadWeather } from '$lib/weather.js';
	import  Cookies from 'js-cookie';
    import { setTheme, currentTheme } from '$lib/theme';
    import '../app.css'
	import Modal from '$lib/components/Modal.svelte';
	import { invalidateAll } from '$app/navigation';

    export let data;
	let showModal = false;
    let hideWeatherLoc = false
    let weatherLocation = data.city
    let weatherToken = ''

    async function saveLocation(e:any) {
		if(e.key == 'Enter') {
            const respose = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherLocation}&limit=5&appid=${data.token}`)
            const responseData = await respose.json();

            if (responseData[0]) {
                Cookies.set('location', weatherLocation, { expires: 365 })
                reloadWeather.set(!$reloadWeather)
                invalidateAll();
            }
        }
    }

    function saveToken(e:any) {
		if(e.key == 'Enter') {
            if(weatherToken.length == 32) {
                Cookies.set('token', weatherToken, { expires: 365 })
            }
        }
    }
</script>


<slot></slot>

<nav class="card blurred fexpand fvertical nowrap">
    <div class="left fvertical">
        <a class="navElement" href="/"><i class="fa-solid fa-house"></i></a>
        <a class="navElement" href="/radar"><i class="fa-solid fa-satellite-dish"></i></a>
    </div>
    <div class="center">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- {#if hideWeatherLoc} -->
        <!-- on:click={() => (hideWeatherLoc = false)}     -->
        <b style="cursor: pointer;" on:click={() => {showModal = true}}>{data.city}</b>
        <!-- {/if} -->
    </div>
    <div class="right fvertical">
        <div id="theme-select">
            {#if $currentTheme == 'light'}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <i class="fa-regular fa-moon themer" on:click={() => setTheme('dark', true)}></i>
            {:else}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <i class="fa-regular fa-sun themer" on:click={() => setTheme('light', true)}></i>
            {/if}
        </div>
        <a class="navElement" id="github" href="https://www.github.com/salaniLeo"
        ><i class="fa-brands fa-github" /></a
      >
    </div>
</nav>

<!-- <div class:hideWeatherLoc={hideWeatherLoc} class="card info fvertical gap2">
    <button on:click={() => (hideWeatherLoc = true)}><i class="fa-solid fa-chevron-down"></i></button>
    <b>Weather in {data.city}</b>
    <button on:click={() => (showModal = true)}>Change</button>
</div> -->

<Modal bind:showModal>
	<h2 slot="header">
		Settings
	</h2>

	<div class="fhorizontal optionsList">
        <div class="fvertical">
            <div class="center text"><p>Location:</p></div>
            <div class="center"><input type="text" name="location" id="locationInput" bind:value={weatherLocation} on:keydown={saveLocation}></div>
        </div>
        <div class="fvertical">
            <div class="center text"><p>Api Token:</p></div>
            <div class="center"><input type="text" name="token" id="tokenInput" bind:value={weatherToken} on:keydown={saveToken}></div>
        </div>
    </div>

</Modal>

<style>
    /* .hideWeatherLoc {
        display: none;
    } */
    nav {
        margin-bottom: 1rem;
        position: fixed;
        bottom: 0;
        display: flex;
        width: 400px;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
        left: 50%;
        height: 35px;
        transform: translateX(-50%);
    }
    #theme-select {
        width: 25px;
        transform: translateY(2px);
    }
    .fa-regular {
        cursor: pointer;
        font-size: 1.5rem;
    }
    b {
        font-weight: 500;
    }
    p {
        margin: 0;
    }
    .optionsList{
        gap: 1rem;
    }
    .text {
        justify-content: start !important;
        width: 80px;
    }
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .left, .right {
        align-items: center;
        flex-wrap: nowrap !important;
        gap: 1rem;
    }
    .navElement {
        font-size: 1.5rem;
    }
    @media only screen and (max-width: 825px) {
        nav {
            width: 80%;
        }
    }
</style>