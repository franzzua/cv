<script lang="ts">
    import { session } from "../auth/session";
    import type { Writable } from "svelte/store";
    export let value: Writable<string>
    let className: string;
    export { className as class };
</script>
{#if $session.isLoggedIn}
    <div class:text={true}  class={className} bind:innerText={$value} contenteditable />
{:else }
    <div class={className}>{$value ?? ''}</div>
{/if}
<style>
    .text {
        padding: .1em;
        border: none;
        outline: none;
        white-space: pre-wrap;
        min-width: 1em;
        &:empty, &:hover {
            background: var(--hoverBg);
            color: var(--hoverColor);
        }
    }
</style>