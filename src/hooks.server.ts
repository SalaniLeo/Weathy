import { currentTheme } from "$lib/theme";
import { weatherLocation, weatherToken } from "$lib/weather";

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    let cookieTheme = event.cookies.get("theme");
    let location = event.cookies.get("location");
    let token = event.cookies.get("token");

    currentTheme.set(cookieTheme)
    weatherLocation.set(location)

    if (token == undefined) {
        weatherToken.set('72d251b81d30ef572ae667dfe6c4ee1a')
    } else {
        weatherToken.set(token)
    }

    if (!cookieTheme) {
        cookieTheme = "dark";
        event.cookies.set("theme", cookieTheme, { path: '/', sameSite: true, maxAge: 2592000, secure: false, httpOnly: false });
    }

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            html = html.replace('data-theme=""', `data-theme="${cookieTheme}"`)
            html = html.replace('data-location=""', `data-location="${location}"`)
            return html;
        }
    });

    return response;
};