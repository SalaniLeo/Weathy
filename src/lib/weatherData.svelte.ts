class weather {

    weatherAlerts: any = undefined

    async getWeatherAlerts() {
        if(this.weatherAlerts === undefined) {
            let request = await fetch("/alerts/");
            let response = await request.json()
            this.weatherAlerts = response;
        }
        console.log(this.weatherAlerts);
        return this.weatherAlerts;
    }

    satelliteImages: any = undefined

    setSatelliteImages(images: any[]) {
        this.satelliteImages = images;
    }

    getSatelliteImages() {
        return this.satelliteImages;
    }

    getWeatherDescription(code: number, is_day: number) {
        const entry = wmoWeatherCodes.find(e => e.code === code);
        if (!entry) {
            return { name: "Unknown", icon: "unknown" };
        }
        
        return {
            name: entry.name,
            icon: `/icons/${entry.icon}_${is_day == 1 ? "day" : "night"}.svg`
        };
    }

    degreesToDirection(deg: number) {
        const directions = [
            "N", "NNE", "NE", "ENE",
            "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW",
            "W", "WNW", "NW", "NNW"
        ];
        const index = Math.round((deg % 360) / 22.5);

        return directions[index % 16];
    }


}

export const weatherFuncs = new weather();


const wmoWeatherCodes = [
  { code:   0, name: "Clear sky",                 icon: "clear" },
  { code:   1, name: "Mainly clear",             icon: "mostly_clear" },
  { code:   2, name: "Partly cloudy",            icon: "partly_cloudy" },
  { code:   3, name: "Overcast",                 icon: "mostly_cloudy" },
  { code: 45, name: "Fog",                       icon: "haze_fog_dust_smoke" },
  { code: 48, name: "Depositing rime fog",       icon: "haze_fog_dust_smoke" },
  { code: 51, name: "Light drizzle",             icon: "drizzle" },
  { code: 53, name: "Moderate drizzle",          icon: "drizzle" },
  { code: 55, name: "Heavy drizzle",             icon: "drizzle" },
  { code: 56, name: "Freezing drizzle light",    icon: "sleet_hail" },
  { code: 57, name: "Freezing drizzle heavy",    icon: "sleet_hail" },
  { code: 61, name: "Light rain",                icon: "rain_with_cloudy_light" },
  { code: 63, name: "Moderate rain",             icon: "rain_with_cloudy_dark" },
  { code: 65, name: "Heavy rain",                icon: "heavy_rain" },
  { code: 66, name: "Light freezing rain",       icon: "sleet_hail" },
  { code: 67, name: "Heavy freezing rain",       icon: "sleet_hail" },
  { code: 71, name: "Light snow",                icon: "snow_with_cloudy_light" },
  { code: 73, name: "Heavy snow",                icon: "heavy_snow" },
  { code: 75, name: "Continuous heavy snow",     icon: "blizzard" },
  { code: 77, name: "Snow grains",               icon: "flurries" },
  { code: 80, name: "Light rain showers",        icon: "scattered_showers" },
  { code: 81, name: "Moderate rain showers",     icon: "showers_rain" },
  { code: 82, name: "Violent rain showers",      icon: "heavy_rain" },
  { code: 85, name: "Light snow showers",        icon: "scattered_snow_showers" },
  { code: 86, name: "Moderate/heavy snow showers",icon: "showers_snow" },
  { code: 95, name: "Thunderstorm without hail", icon: "isolated_thunderstorms" },
  { code: 96, name: "Thunderstorm with hail",    icon: "strong_thunderstorms" },
  { code: 99, name: "Thunderstorm heavy with hail", icon: "strong_thunderstorms" }
];
