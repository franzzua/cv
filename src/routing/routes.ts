import cv from "./cv.page.svelte";
import login from "../auth/login.svelte";
import main from "./main.page.svelte";

export const Routes: Record<string, any> = {
    '/login': login,
    '/cv': cv,
    '/': main
}