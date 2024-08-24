<script lang="ts">
	import { weather } from '$lib/weather.js';
    import { setTheme, currentTheme } from '$lib/theme';
    import '../app.css'
	import Dialog from '$lib/components/Modal.svelte';
	import Modal from '$lib/components/Modal.svelte';

    export let data;
	let showModal = false;
    let hideWeatherLoc = false
</script>


<slot></slot>

<nav class="card">
    <div class="left fvertical">
        <a class="navElement" href="/"><i class="fa-solid fa-house"></i></a>
        <a class="navElement" href="/radar"><i class="fa-solid fa-satellite-dish"></i></a>
    </div>
    <div class="center">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if hideWeatherLoc}
            <b on:click={() => (hideWeatherLoc = false)}>{data.city}</b>
        {/if}
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

<div class:hideWeatherLoc={hideWeatherLoc} class="card info fvertical gap2">
    <button on:click={() => (hideWeatherLoc = true)}><i class="fa-solid fa-chevron-down"></i></button>
    <b>Weather in {data.city}</b>
    <button on:click={() => (showModal = true)}>Change</button>
</div>

<Modal bind:showModal>
	<h2 slot="header">
		Settings
	</h2>

	<div class="fhorizontal optionsList">
        <div class="fvertical">
            <div class="center text"><p>Location:</p></div>
            <div class="center"><input type="text" name="location" id="locationInput"></div>
        </div>
        <div class="fvertical">
            <div class="center text"><p>Api Token:</p></div>
            <div class="center"><input type="text" name="location" id="locationInput"></div>
        </div>
    </div>

</Modal>

<style>
    .hideWeatherLoc {
        display: none;
    }
    nav {
        margin: 1rem;
        margin-left: 0 !important;
        margin-right: 0 !important;
        position: fixed;
        bottom: 0;
        display: flex;
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
    .info {
        width: max-content;
        position: fixed;
        bottom: 0;
        margin: 1rem;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
        height: 35px;
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
</style>