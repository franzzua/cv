import { writable } from "svelte/store";
import { getDefaultSession, type ISessionInfo } from "@inrupt/solid-client-authn-browser";

export const session = writable<ISessionInfo>(getDefaultSession().info)