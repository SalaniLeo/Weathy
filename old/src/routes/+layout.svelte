<script lang="ts">
	import { reloadWeather } from '$lib/weather.js';
	import  Cookies from 'js-cookie';
    import { setTheme, currentTheme } from '$lib/theme';
	import Modal from '$lib/components/Modal.svelte';
	import { invalidateAll } from '$app/navigation';

    let { data, children } = $props()

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

{#if !data.origin.includes('localhost')}
    <script defer src="https://analytics.salanileo.dev/script.js" data-website-id="11c5e181-3aad-4d0e-b532-33ac0cb973fb"></script>
{/if}

<slot></slot>

<nav class="flexrow halign space-between padding3">
    <div class="flexrow space-between gap2">
        <a class="navElement" href="/">
            <svg class="icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="var(--font-primary-color)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>home_3_fill</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Building" transform="translate(-96.000000, -48.000000)" fill-rule="nonzero"> <g id="home_3_fill" transform="translate(96.000000, 48.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M13.2279,2.68814 C12.5057,2.12641 11.4944,2.12641 10.7722,2.68814 L2.38841,9.20884 C1.63605,9.79401 2.04989,11 3.00297,11 L4.00005,11 L4.00005,19 C4.00005,20.1046 4.89548,21 6.00005,21 L9.99999915,21 L9.99999915,15 C9.99999915,13.8954 10.8954,13 11.9999991,13 C13.1046,13 13.9999991,13.8954 13.9999991,15 L13.9999991,21 L18.0001,21 C19.1046,21 20.0001,20.1046 20.0001,19 L20.0001,11 L20.9971,11 C21.9492,11 22.3648,9.79463 21.6117,9.20884 L13.2279,2.68814 Z" id="路径" fill="var(--font-primary-color)"> </path> </g> </g> </g> </g></svg>
        </a>
        <a class="navElement" href="/radar">
            <svg class="icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>radar_2_fill</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Device" transform="translate(-240.000000, -240.000000)" fill-rule="nonzero"> <g id="radar_2_fill" transform="translate(240.000000, 240.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M7.41849,3.97302 L12.2656,8.82015 L12.3529,8.73283 C12.7434,8.34231 13.3766,8.34231 13.7671,8.73283 C14.1576,9.12336 14.1576,9.75652 13.7671,10.147 L13.6798,10.2344 L18.0269,14.5816 C18.5991,15.1537 18.6413,16.1389 17.9741,16.7314 C16.6596,17.8988 14.9991,18.6876 13.1667,18.925 L14.1476,20.2434 C14.6875,20.9691 14.1696,22 13.265,22 L6.68506,22 C5.90253,22 5.37025,21.206 5.66753,20.4821 L6.92068,17.4307 C4.55327,15.8094 3,13.0861 3,10 C3,7.70818 3.85794,5.61433 5.26864,4.02585 C5.86115,3.35867 6.84631,3.40084 7.41849,3.97302 Z M8.69541,18.3739 L8.02762,20 L11.4737,20 L10.6554,18.9002 C9.9741,18.7982 9.31777,18.6197 8.69541,18.3739 Z M14.1077,5.05316 C14.8356,5.1815 15.5042,5.537 16.0177,6.06868 C16.5311,6.60036 16.863,7.28094 16.9659,8.01288 C17.0428,8.55979 16.6617,9.06546 16.1148,9.14232 C15.6069643,9.21369 15.1346531,8.89022944 15.0082806,8.40576989 L14.9854,8.29122 C14.9413,7.97754 14.799,7.68586 14.579,7.458 C14.3955833,7.26810833 14.1660556,7.13066111 13.9140856,7.05828565 L13.7604,7.02277 C13.2165,6.92687 12.8534,6.40821 12.9493,5.86432 C13.0452,5.32042 13.5638,4.95725 14.1077,5.05316 Z M14,2 C14.7879,2 15.5681,2.15519 16.2961,2.45672 C17.0241,2.75825 17.6855,3.20021 18.2426,3.75736 C18.7998,4.31451 19.2417,4.97595 19.5433,5.7039 C19.8448,6.43185 20,7.21207 20,8 C20,8.55228 19.5523,9 19,9 C18.48715,9 18.0644908,8.61395571 18.0067275,8.11662025 L18,8 C18,7.47471 17.8965,6.95457 17.6955,6.46927 C17.4945,5.98396 17.1999,5.54301 16.8284,5.17157 C16.457,4.80014 16.016,4.5055 15.5307,4.30448 C15.0454,4.10346 14.5253,4 14,4 C13.4477,4 13,3.55228 13,3 C13,2.44772 13.4477,2 14,2 Z" id="形状" fill="var(--font-primary-color)"> </path> </g> </g> </g> </g></svg>
        </a>
    </div>
    <div class="center">
        <b style="cursor: pointer;" onclick={() => showModal = true}>{data.city}</b>
    </div>
    <div class="right fvertical">
        <div id="theme-select">
            {#if $currentTheme == 'light'}
                 <button class="transparent" onclick={() => setTheme('dark', true)}>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z" stroke="var(--font-primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                 </button>
            {:else}
            <button class="transparent" onclick={() => setTheme('light', true)}>
                <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="var(--font-primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            {/if}
        </div>
        <a class="navElement" id="github" href="https://www.github.com/salaniLeo"
        ><i class="fa-brands fa-github" /></a
      >
    </div>
</nav>

<div class:hideWeatherLoc={hideWeatherLoc} class="card info fvertical gap2">
    <button onclick={() => hideWeatherLoc = true}><i class="fa-solid fa-chevron-down"></i></button>
    <b>Weather in {data.city}</b>
    <button onclick={() => showModal = true}>Change</button>
</div>

<Modal bind:showModal>
	<h2 slot="header">
		Settings
	</h2>

	<div class="fhorizontal optionsList">
        <div class="fvertical">
            <div class="center text"><p>Location:</p></div>
            <div class="center"><input type="text" name="location" id="locationInput" bind:value={weatherLocation} onkeydown={saveLocation}></div>
        </div>
        <div class="fvertical">
            <div class="center text"><p>Api Token:</p></div>
            <div class="center"><input type="text" name="token" id="tokenInput" bind:value={weatherToken} onkeydown={saveToken}></div>
        </div>
    </div>
</Modal>

<style>
    nav {
        border: 2px solid var(--outline-inactive);
        background-color: var(--background-blurry);
        border-radius: var(--border-radius-heavy);
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