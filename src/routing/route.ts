import { get, writable, } from "svelte/store";

export const route = writable(location.pathname);

export function go(to: URL){
    route.set(to.pathname);
    history.pushState('', '', to);
}