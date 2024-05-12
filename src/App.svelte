<script lang="ts">
  import Router from "./routing/router.svelte";
  import { EVENTS, getDefaultSession, handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
  import { go } from "./routing/route";
  import { session } from "./auth/session";
  handleIncomingRedirect({restorePreviousSession: true, url: location.href}).then(() => {
      isLoading = false;
  });
  const sessionWrapper = getDefaultSession();
  $: isLoading = true;
  sessionWrapper.events.on(EVENTS.SESSION_RESTORED, (url) => {
      go(new URL(url));
      session.set(sessionWrapper.info);
  });
</script>
{#if !isLoading}
<Router/>
{/if}