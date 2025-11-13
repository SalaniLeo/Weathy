<script lang="ts">
	import { base } from "$app/paths";
	import { degreesUnit, getDayName, getHour, mapWeatherIconToName } from "$lib/weather";

    let carouselShow = $state([false, true])
    let { weather } = $props()

    function switchPage(hourly: boolean) {
        carouselShow[0] = !hourly; carouselShow[1] = hourly
    }

</script>

<div class="flexcolumn gap2">
    <div class="flexrow halign">
        <button class="btnLeft" class:active={carouselShow[1]} onclick={() => switchPage(true)}>Hourly</button>
        <button class="btnRight" class:active={carouselShow[0]} onclick={() => switchPage(false)}>Daily</button>
    </div>
    <div>
        <div class:hide={carouselShow[1]} class="flexcolumn">
            {#each weather.daily as daily}
                    <div class="flexrow space-between">
                        <div class="fl">
                            <img src={base + "/icons/" + mapWeatherIconToName(daily['weather']['0']['icon'])} alt="icon"/>
                            <p>{getDayName(daily.dt)}</p>
                            <p>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.99999 14C8.99999 13.4477 8.55227 13 7.99999 13C7.4477 13 6.99999 13.4477 6.99999 14C6.99999 15.3574 7.26721 16.7375 8.08236 17.7972C8.93437 18.9048 10.2571 19.5 12 19.5C12.5523 19.5 13 19.0523 13 18.5C13 17.9477 12.5523 17.5 12 17.5C10.7429 17.5 10.0656 17.0952 9.66761 16.5778C9.23276 16.0125 8.99999 15.1426 8.99999 14Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4228 1.54267C12.6513 0.711988 11.348 0.712021 10.5766 1.54273C9.63287 2.55896 7.89116 4.5305 6.37916 6.77881C4.87045 9.02222 3.46953 11.5773 3.49416 14.3526C3.49633 14.5981 3.50939 14.9426 3.55218 15.3536C3.63717 16.17 3.84245 17.278 4.33361 18.4008C4.82693 19.5285 5.61868 20.6923 6.88173 21.5709C8.15052 22.4536 9.82552 23 11.9997 23C14.1739 23 15.8489 22.4536 17.1178 21.5709C18.3808 20.6923 19.1727 19.5286 19.6661 18.4009C20.1573 17.2781 20.3627 16.17 20.4477 15.3536C20.4905 14.9427 20.5036 14.5982 20.5058 14.3527C20.5306 11.5774 19.1293 9.02208 17.6206 6.77875C16.1084 4.53043 14.3666 2.55889 13.4228 1.54267ZM8.03877 7.89491C9.44577 5.80274 11.0797 3.94302 11.9997 2.94942C12.9198 3.94301 14.5539 5.80273 15.961 7.89491C17.2351 9.78932 18.5269 11.9805 18.5059 14.3348C18.5042 14.5268 18.4938 14.8074 18.4585 15.1464C18.3873 15.83 18.2176 16.722 17.8338 17.5992C17.4521 18.4715 16.8689 19.3078 15.9756 19.9291C15.0882 20.5465 13.8256 21 11.9997 21C10.1738 21 8.91129 20.5465 8.02387 19.9291C7.13071 19.3078 6.54754 18.4715 6.16596 17.5992C5.78221 16.722 5.61259 15.8301 5.54142 15.1465C5.50613 14.8074 5.49578 14.5269 5.49408 14.3349C5.4732 11.9806 6.76469 9.78944 8.03877 7.89491Z" fill="var(--font-primary-color)"></path> </g></svg>
                                {Math.round((daily.pop)*100)}%
                            </p>
                        </div>
                        <div class="flexrow">
                            <div><i class="fa-solid fa-chevron-up"></i>{Math.round(daily.temp.max)} {degreesUnit}</div>
                            <div><i class="fa-solid fa-chevron-down"></i>{Math.round(daily.temp.min)} {degreesUnit}</div>
                        </div>
                    </div>
            {/each}
        </div>
        <div class:hide={carouselShow[0]} class="padding3 gap2 card radius-heavy" id="hourly">
            {#each weather.hourly.slice(0, 8) as hourly}
                <div class="flexrow space-between">
                    <img src={base + "/icons/" + mapWeatherIconToName
                    (hourly['weather']['0']['icon'])} alt="icon"/>
                    <p>{getHour(hourly.dt)}</p>
                    <p>{Math.round((hourly.pop)*100)}%</p>
                    <p>{Math.round(hourly.temp)} {degreesUnit}</p>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .card {
        background-color: var(--background-blurry);
        border: 1px solid var(--border-color);
        min-width: max-content;
    }
    .btnLeft {
        border-radius: unset;
        width: 4.5rem;
        border-top-left-radius: var(--border-radius-medium);
        border-bottom-left-radius: var(--border-radius-medium);
    }
    .btnRight {
        transform: translateX(2px);
        width: 4.5rem;
        border-radius: unset;
        border-top-right-radius: var(--border-radius-medium);
        border-bottom-right-radius: var(--border-radius-medium);
    }
    .active {
        background-color: var(--hover-background-color);
    }
    .hide {
        display: none !important;
        transition-duration: 1s;
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
    }
    @media only screen and (max-width: 480px) {
        .dayheader {
            flex-wrap: nowrap;
            gap: 0.5rem;
        }
    }
</style>