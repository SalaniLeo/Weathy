import { env } from '$env/dynamic/private';

export async function load(event) {

    let user_ip = event.getClientAddress()

    if(user_ip == '::ffff:127.0.0.1' || user_ip == '::ffff:192.168.50.92') {
        user_ip = env.IP
    }

    const ipres = await fetch(`https://ipinfo.io/${user_ip}/json?token=cd93e239213774`)
    const ipData = await ipres.json();
    const loc = ipData.loc
    const city = ipData.city

    const weatherres = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${String(loc).split(',')[0]}&lon=${String(loc).split(',')[1]}&units=metric&appid=72d251b81d30ef572ae667dfe6c4ee1a`)
    const weatherData = await weatherres.json();

    return { weatherData, city }
}