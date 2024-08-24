// @ts-nocheck
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

export const currentTheme = writable(getTheme());

export function setCookie(name, args){
	Cookies.set(name, args, { expires: 365 });
}

export function getCookie(name){
	return Cookies.get(name);
}

export function setTheme(theme, save) {
    console.log(theme)
    document.documentElement.dataset.theme = theme;
    currentTheme.set(theme);
    if (save) setCookie("theme", theme);
}

export function getTheme() {
  return getCookie('theme');
}