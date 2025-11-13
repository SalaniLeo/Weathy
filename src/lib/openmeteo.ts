import { fetchWeatherApi } from "openmeteo";

const params = {
	latitude: 44.83,
	longitude: 11.62,
	current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "pressure_msl", "surface_pressure", "wind_direction_10m", "wind_gusts_10m", "wind_speed_10m"],
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0)!.value(),
		relative_humidity_2m: current.variables(1)!.value(),
		apparent_temperature: current.variables(2)!.value(),
		is_day: current.variables(3)!.value(),
		precipitation: current.variables(4)!.value(),
		rain: current.variables(5)!.value(),
		showers: current.variables(6)!.value(),
		snowfall: current.variables(7)!.value(),
		weather_code: current.variables(8)!.value(),
		cloud_cover: current.variables(9)!.value(),
		pressure_msl: current.variables(10)!.value(),
		surface_pressure: current.variables(11)!.value(),
		wind_direction_10m: current.variables(12)!.value(),
		wind_gusts_10m: current.variables(13)!.value(),
		wind_speed_10m: current.variables(14)!.value(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
	`\nCurrent time: ${weatherData.current.time}\n`,
	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
	`\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
	`\nCurrent is_day: ${weatherData.current.is_day}`,
	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
	`\nCurrent rain: ${weatherData.current.rain}`,
	`\nCurrent showers: ${weatherData.current.showers}`,
	`\nCurrent snowfall: ${weatherData.current.snowfall}`,
	`\nCurrent weather_code: ${weatherData.current.weather_code}`,
	`\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
	`\nCurrent pressure_msl: ${weatherData.current.pressure_msl}`,
	`\nCurrent surface_pressure: ${weatherData.current.surface_pressure}`,
	`\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
	`\nCurrent wind_gusts_10m: ${weatherData.current.wind_gusts_10m}`,
	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
);
export { weatherData };