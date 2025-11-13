export let strings : Record<string, string> = {
    current: "https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=auto"
};

export async function requestPlaceName(coordinates: {lat: string, lon: string}  ) {

    let request = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&format=json`);
    let response = await request.json();
    return response;
}