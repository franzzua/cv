<script lang="ts">
    import {
        login,
        EVENTS, Session, getDefaultSession, handleIncomingRedirect
    } from "@inrupt/solid-client-authn-browser";
    import { session } from "./session";

    async function startLogin() {
        await login({
            oidcIssuer: "https://login.inrupt.com",
            redirectUrl: new URL("/", window.location.href).toString(),
            clientName: "CV",
        });
    }
    startLogin();
    $: isLoading = true
</script>
